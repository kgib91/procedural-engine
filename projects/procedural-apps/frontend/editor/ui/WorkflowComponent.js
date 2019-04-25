import Enumerable from "linq"
import DockerComponent from "./DockerComponent"

var regionPadding = 5;
var DefaultSize = {
    width: 80,
    height: 60
};

var RegionNodeComponent = {
    onupdate: (vnode) => {
        var state = vnode.attrs;
        if(Array.isArray(state.node.model) && state.node.model.length > 0) {
            var nodeElement = $(`.node_${state.node.id}`);
            var receiverElement = nodeElement.find('.node-drop-receiver:first')[0];
            var recRect = receiverElement.getBoundingClientRect();

            var bnds = new bounds();
            bnds.add({left:recRect.left,top:recRect.top,right:recRect.left,bottom:recRect.top});
            for(var i = 0; i < state.node.model.length; ++i) {
                var childNode = state.items[state.node.model[i].id];
                var childElement = $(`.node_${childNode.id}`);
                var childRect = childElement[0].getBoundingClientRect();
                bnds.add(childRect);
            }
            var childrenRect = bnds.get();
            var dx = childrenRect.left - recRect.left;
            var dy = childrenRect.top - recRect.top;
            for(var i = 0; i < state.node.model.length; ++i) {
                var childNode = state.items[state.node.model[i].id];
                if(dx < regionPadding) {
                    childNode.coord.x += Math.abs(dx);
                }
                if(childNode.coord.x < regionPadding) {
                    childNode.coord.x = regionPadding;
                }
                if(dy < regionPadding) {
                    childNode.coord.y += Math.abs(dy);
                }
                if(childNode.coord.y < regionPadding) {
                    childNode.coord.y = regionPadding;
                }
            }

            state.node.size = state.node.size || { width: DefaultSize.width, height: DefaultSize.height };
            state.node.size.width = Math.max(DefaultSize.width, childrenRect.width + 5);
            state.node.size.height = Math.max(DefaultSize.height, childrenRect.height + 5);
        }
    },
    view: (vnode) => {
        var state = vnode.attrs;
        var api = state.api;

        function onenter(e) {
            if(!api.entered()) {
                api.onenter(e);
            }
        }

        function onleave(e) {
            api.onleave(e);
        }

        var nodes = [];
        if(Array.isArray(state.node.model)) {
            for(var i = 0; i < state.node.model.length; ++i) {
                var childNode = state.items[state.node.model[i].id];
               nodes.push(
                    state.renderNodes.node(state.modules, state.items, state.defaults, childNode, true)
                )
            }
        }

        var size = {
            w: state.node.size != null ? state.node.size.width : DefaultSize.width,
            h: state.node.size != null ? state.node.size.height : DefaultSize.height
        };

        var props = {
            class: 'node-drop-receiver',
            onmouseenter: onenter,
            onmousemove: onenter,
            onmouseout: onleave,
            width: size.w,
            height: size.h,
            style: ['position: relative',`width:${size.w}px`,`height:${size.h}px`].join(';')
        };

        return m('div', props, nodes);
    }
}

const getModule = (modules, path) => {
    var node = modules;
    var parts = path.split('.');
    while(parts.length > 0) {
        var section = parts.shift();
        if(node.exports != null) {
            node = node.exports;
        }
        node = node[section];
    }
    return node;
}

const encodeId = (id) => {
    return id.replace(/[\./]/g, '_');
}

const getDistinctSocketBindings = (socketChildren) => {
    var socketBindings = flattenAllChildren(socketChildren);

    var socketBindingClassNames = Array.prototype.concat.apply([], Enumerable.from(socketBindings)
        .select(
            (x) => (x.attrs != null ? (x.attrs.className || '').split(' ') : null)
        ).toArray());
    return Enumerable.from(socketBindingClassNames).where((x)=>x!=null).distinct().where((x)=>x.indexOf('node-')>-1||x.indexOf('outbound')>-1||x.indexOf('inbound')>-1).toArray();
}

const getWorkflowNodes = (workflow) => {
    var items = [];
    for(var i = 0; i < workflow.length; ++i) {
        var wfi = workflow[i];
        items[wfi.id] = wfi;
    }
    return items;
}

const flattenAllChildren = (im) => {
    var all = [];
    if(Array.isArray(im)) {
        im.forEach((x) => {
            if(x != null) {
                all.push(x);
                all = all.concat(flattenAllChildren(x.children))
            }
        });
    }
    return all;
}

const getCollapsedClasses = (isExpanded, sockets) => {
    var socketChildren = sockets.inbound != null
        ? ((sockets.outbound != null) ? sockets.inbound.concat(sockets.outbound) : sockets.inbound)
        : sockets.outbound;
    
    var distinctSocketBindings = getDistinctSocketBindings(socketChildren);
    return isExpanded ? null : ['collapsed'].concat(distinctSocketBindings).join(' ');
}

const getConnection = (modules, path) => {
    var inboundStr = '.inbound.';
    var outboundStr = '.outbound.';
    var inboundIndex = path.indexOf(inboundStr);
    var outboundIndex = path.indexOf(outboundStr);
    var mdlePath = null;
    var connectionName = null;

    if(inboundIndex !== -1) {
        mdlePath = path.substr(0, inboundIndex);
        connectionName = path.substr(inboundIndex + inboundStr.length)
    } else if(outboundIndex !== -1) {
        mdlePath = path.substr(0, outboundIndex);
        connectionName = path.substr(outboundIndex + outboundStr.length)
    }

    if(mdlePath != null && connectionName != null) {
        var mdle = getModule(modules, mdlePath);
        if(mdle.connections != null) {
            for(var i = 0; i < mdle.connections.length; ++i) {
                var conn = mdle.connections[i];
                if(conn.name == connectionName) {
                    return conn;
                }
            }
        }
    }

    return null;
}

const getConnections = (bindings, items) => {
    var connections = [];
    for(var i = 0; i < bindings.length; ++i) {
        var binding = bindings[i];
        var sourceItem = items[binding.sourceId];
        var targetItem = items[binding.targetId];
        var from = sourceItem.action+'.outbound.'+binding.source;
        var to = targetItem.action+'.inbound.'+binding.target;
        connections.push([
            { socket: from, node: binding.sourceId },
            { socket: to, node: binding.targetId }
        ]);
    }
    return connections;
}

function getDefaults(modules, bindings, items) {
    var defaults = [];
    var sockets = Enumerable.from(getConnections(bindings, items)).select((x) => x.socket).toArray();
    var connections = Array.prototype.concat.apply([], sockets);

    var unassignedConnections = [];
    for(var i = 0; i < items.length; ++i) {
        var item = items[i];
        if(items[i] == null) {
            continue;
        }
        var mdle = getModule(modules, item.action);
        if(mdle.connections != null && Array.isArray(mdle.connections)) {
            for(var j = 0; j < mdle.connections.length; ++j) {
                var conn = mdle.connections[j];
                var connName = item.action + '.' + conn.direction + '.' + conn.name;
                if(connections.indexOf(connName) === -1) {
                    unassignedConnections.push(connName);
                }
            }
        }
    }

    var defaultValues = {};
    for(var i = 0; i < unassignedConnections.length; ++i) {
        var uconn = unassignedConnections[i];
        var conn = getConnection(modules, uconn);

        var defaultValue = null;
        if(conn != null) {
            if(conn.constraints != null) {
                for(var j = 0; j < conn.constraints.length; ++j) {
                    var constraint = conn.constraints[j];
                    if(constraint.name === "default") {
                        defaultValue = constraint.value;
                    }
                }
            }
        }
        defaultValues[uconn] = defaultValue;
    }

    return defaultValues;
}

var targetContainer = null;
var targetDragNode = null;
var targetDragNodeStartPos = null;
var dragStartMousePos = null;
var targetDropNode = null;
var targetDropElement = null;
var targetDropNodeIndex = null;

var expandedByDefault = ['prototype', 'region'];



function bounds() {
    var min_X = Number.MAX_VALUE;
    var min_Y = Number.MAX_VALUE;
    var max_X = Number.MIN_VALUE;
    var max_Y = Number.MIN_VALUE;

    this.get = () => {
            return {
                left: min_X,
                top: min_Y,
                right: max_X,
                bottom: max_Y,
                width: max_X - min_X,
                height: max_Y - min_Y
            };
    };

    this.add = ( cr ) => {
        min_X = Math.min(min_X, cr.left);
        min_Y = Math.min(min_Y, cr.top);
        max_X = Math.max(max_X, cr.right);
        max_Y = Math.max(max_Y, cr.bottom);
    };

    this.debugDraw = (dx,dy) => {
        var html = `<div style="background-color:transparent;border:1px solid red;position:absolute;z-index:1000;left:${min_X+(dx||0)}px;top:${min_Y+(dy||0)}px;width:${(max_X-min_X)|0}px;height:${(max_Y-min_Y|0)}px;"></div>`;
        var ele = $(html);
        $(document.body).append(ele);
        setTimeout(()=> {
            ele.remove();
        }, 1000 * 1);
    };
}

function stopNodeDrag(e) {
    if(targetDragNode != null) {
        var dragObject = $('.dragObject');
        dragObject.addClass('hidden');

        targetDragNode.css({visibility:'initial'})
        targetContainer.off('mousemove', onNodeDrag);
        $(window).off('mouseup', stopNodeDrag);

        var parent = targetDragNode.parents('.docker-component')[0];
        var vnode = $(parent).data('component');
        var nodeId = parseInt(targetDragNode.attr('node-id'));

        var data = vnode.attrs.content;
        var items = getWorkflowNodes(data.workflow);
        var node = items[nodeId];
        
        if(node == null) {
            node = {
                id: data.workflow.length,
                expanded: expandedByDefault.indexOf(targetDragNode.attr('data-type')) != -1 ? true : false,
                name: targetDragNode.attr('data-name'),
                action: targetDragNode.attr('data-action')
            };
            data.workflow.push(node);
        }

        var parentElement = targetDragNode.parents('.workflow-node')[0];
        if(parentElement != null) {
            var parentNodeId = parseInt($(parentElement).attr('node-id'));
            var parentNode = items[parentNodeId];
            if(parentNode != null && parentNode.model != null) {
                var idx = Enumerable.from(parentNode.model)
                    .select((x,ii) => x.id == nodeId ? ii : -1)
                    .where((x) => x != -1)
                    .firstOrDefault();
                if(idx != null) {
                    parentNode.model.splice(idx, 1);
                }
            }
        }
        
        if(targetDropNode != null && node.id != targetDropNode.id)
        {
            node.root = false;
            if(targetDropNode.model == null) {
                targetDropNode.model = [];
            }
            targetDropNode.model.splice(targetDropNodeIndex, 0, { id: node.id });
        } else {
            node.root = true;
        }

        var nodePos = targetDragNode.offset();
        var conPos = targetContainer.offset();
        var sx = (targetDragNodeStartPos.left - conPos.left) - 3;
        var sy = (targetDragNodeStartPos.top - conPos.top) - 3;
        
        var ddx = (targetDragNodeStartPos.left - dragStartMousePos.offsetX)
        var ddy = (targetDragNodeStartPos.top - dragStartMousePos.offsetY)

        var dx = e.pageX - dragStartMousePos.pageX;
        var dy = e.pageY - dragStartMousePos.pageY;

        node.coord = {
            x: (sx + dx) + 3,
            y: (sy + dy) + 3
        };

        var parentNodeElement = $(targetDropElement).parents('.workflow-node');
        if(parentNodeElement[0] != null) {
            var parentElement = $(parentNodeElement[0]);
            var receiverOffset = $(parentElement.find('.prototype_container')[0]).offset();
            var parentNodeId = parseInt(parentElement.attr('node-id'));
            var parentNode = items[parentNodeId];
            node.coord.x -= receiverOffset.left - conPos.left;
            node.coord.y -= receiverOffset.top - conPos.top;
        }

        if(vnode.attrs.onchange != null) {
            vnode.attrs.onchange(vnode.attrs.content)
        }

        targetDragNode = null;
        targetContainer = null;
        targetDragNodeStartPos = null;
        dragStartMousePos = null;

        targetDropNode = null;
        targetDropElement = null;
        var dragObject = $('.dragObject');
        if(dragObject[0] != null) {
            dragObject.removeClass('nestable');
        }

        var nestDepth = 4;
        m.redraw();
        for(var i = 0; i < nestDepth; ++i) {
            (function(j) {
                setTimeout(() => {
                    m.redraw();
                    console.log(`call${j}`);
                }, 15 * j);
            })(i);
        }
    }
}

function onNodeDrag(e) {
    if(targetDragNode != null) {
        var dragObject = $('.dragObject');
        var nodePos = targetDragNode.offset();
        var conPos = targetContainer.offset();
        var sx = (targetDragNodeStartPos.left - conPos.left) - 3;
        var sy = (targetDragNodeStartPos.top - conPos.top) - 3;
        
        var ddx = (targetDragNodeStartPos.left - dragStartMousePos.offsetX)
        var ddy = (targetDragNodeStartPos.top - dragStartMousePos.offsetY)

        var dx = e.pageX - dragStartMousePos.pageX;
        var dy = e.pageY - dragStartMousePos.pageY;

        dragObject.css({
            left: sx + dx,
            top: sy + dy
        })
    }
}

function startNodeDrag(e) {
    var node = targetDragNode = null;
    if($(e.target).hasClass('module-action')) {
        node = targetDragNode = $(e.target);
    } else {
        node = targetDragNode = $($(e.target).parents('.workflow-node')[0]);
    }
    if(node[0] == null) {
        return;
    }
    targetDragNode.css({visibility:'hidden'});

    var size = { width: node.outerWidth(), height: node.outerHeight() };

    var container = targetContainer = node.parents('.editor');
    var conPos = container.offset()

    var dragObject = $('.dragObject');
    dragObject.removeClass('hidden');
    var nodePos = targetDragNodeStartPos = node.offset();
    dragStartMousePos = { pageX: e.pageX, pageY: e.pageY };

    dragObject.width(size.width);
    dragObject.height(size.height);
    dragObject.css({
        left: nodePos.left - conPos.left - 3,
        top: nodePos.top - conPos.top - 3
    });

    container.on('mousemove', onNodeDrag)
    $(window).on('mouseup', stopNodeDrag)
}

function toggleExpandableNode(e) {
    var nodeEle = $($(e.target).parents('.workflow-node')[0]);
    var parent = nodeEle.parents('.docker-component')[0];
    var vnode = $(parent).data('component');
    var nodeId = parseInt(nodeEle.attr('node-id'));
    
    var node = Enumerable.from(vnode.attrs.content.workflow).where((x)=>x.id == nodeId).firstOrDefault();
    node.expanded = node.expanded != null ? !node.expanded : false;
    m.redraw();
    renderSvgLines(vnode);
}

const nodeComponents = {};

const renderNodes = {
    node: (modules, items, defaults, node, sticky) => {
        var coord = {
            x: node.coord != null ? node.coord.x : 0,
            y: node.coord != null ? node.coord.y : 0
        };

        var mdle = getModule(modules, node.action);
        var nodeProps = {
            class: ['node_',node.id,' ', 'workflow-node ',(sticky ? 'sticky' : ''),' type-',mdle.type].join(''),
            style: ['left:',coord.x,'px;top:',coord.y,'px'].join(''),
            'node-id': node.id
        };
        if(mdle.editor_class != null) {
            nodeProps.class = [nodeProps.class, mdle.editor_class].join(' ');
        }
        var nodeEle = renderNodes[mdle.type](modules, defaults, items, node);
        return m('div', nodeProps, nodeEle)
    },
    action: (modules, defaults, items, node) => {
        var mdle = getModule(modules, node.action);
        var sockets = renderNodes.renderSockets(mdle, node, defaults);
        var isExpanded = node.expanded == null ? true : node.expanded;
        var collapsedClasses = getCollapsedClasses(isExpanded, sockets);

        return [
            m('div', { class: 'handle', onmousedown: startNodeDrag }),
            m('div', { class: 'workflow-node-name', ondblclick: toggleExpandableNode }, [node.name || mdle.name || node.action]),
            m('div', collapsedClasses != null ? { class: collapsedClasses } : null, [
                m('div', { class: 'pull-left' }, m('ul', sockets.inbound)),
                m('div', { class: 'pull-right' }, m('ul', sockets.outbound))
            ]),
            m('div', { class: 'clearfix' })
        ]
    },
    event: (modules, defaults, items, node) => {
        var mdle = getModule(modules, node.action);
        var sockets = renderNodes.renderSockets(mdle, node, defaults);
        var isExpanded = node.expanded == null ? true : node.expanded;

        return [
            m('div', { class: 'handle', onmousedown: startNodeDrag }),
            m('div', { class: 'workflow-node-name', ondblclick: toggleExpandableNode }, [node.name]),
            m('div', { class: 'pull-left'}, m('ul', sockets.inbound)),
            m('div', { class: 'pull-right'}, m('ul', sockets.outbound)),
            m('div', { class: 'clearfix' })
        ]
    },
    variable: (modules, defaults, items, node) => {
        var mdle = getModule(modules, node.action);
        var sockets = renderNodes.renderSockets(mdle, node, defaults);
        var isExpanded = node.expanded == null ? true : node.expanded;
        var collapsedClasses = getCollapsedClasses(isExpanded, sockets);

        return [
            m('div', { class: 'handle', onmousedown: startNodeDrag }),
            m('div', { class: 'workflow-node-name', ondblclick: toggleExpandableNode }, [node.name || mdle.name || node.action]),
            m('div', collapsedClasses != null ? { class: collapsedClasses } : null, [
                m('div', { class: 'pull-left' }, m('ul', sockets.inbound)),
                m('div', { class: 'pull-right' }, m('ul', sockets.outbound))
            ]),
            m('div', { class: 'clearfix' })
        ]
    },
    region:  (modules, defaults, items, node) => {
        var mdle = getModule(modules, node.action);
        var sockets = renderNodes.renderSockets(mdle, node, defaults);
        var isExpanded = node.expanded == null ? true : node.expanded;
        var collapsedClasses = getCollapsedClasses(isExpanded, sockets);
        
        var api = {
            entered: () => targetDropNode != null,
            onenter: function(e) {
                if(targetDragNode != null) {
                    var dragObject = $('.dragObject');
                    if(dragObject[0] != null) {
                        dragObject.addClass('nestable');
                    }
                    targetDropElement = e.target;
                    targetDropNode = node;
                    targetDropNodeIndex = e.dropIndex;
                }
            },
            onleave: function(e) {
                if(targetDropNode != null && targetDropNode.id == node.id) {
                    targetDropNode = null;
                    targetDropElement = null;
                    var dragObject = $('.dragObject');
                    if(dragObject[0] != null) {
                        dragObject.removeClass('nestable');
                    }
                }
            }
        };

        var cEle = m(RegionNodeComponent, {
            renderNodes,
            modules,
            defaults,
            items,
            node,
            api
        }, []);

        var collapsedNodeClasses = getCollapsedClasses(isExpanded, { inbound: cEle });

        return [
            m('div', { class: 'handle', onmousedown: startNodeDrag }),
            m('div', { class: 'workflow-node-name', ondblclick: toggleExpandableNode }, [node.name]),
            m('div', { class: ['sockets_container', collapsedClasses].join(' ') }, [
                m('div', { class: 'pull-left' }, m('ul', sockets.inbound)),
                m('div', { class: 'pull-right' }, m('ul', sockets.outbound)),
                m('div', { class: 'clearfix' })
            ]),
            m('div', { class: ['prototype_container', collapsedNodeClasses].join(' ') }, [
                m('div', { class: 'prototype-model-container' }, cEle)
            ])
        ]
    },
    prototype: (modules, defaults, items, node) => {
        var mdle = getModule(modules, node.action);
        var sockets = renderNodes.renderSockets(mdle, node, defaults);
        var isExpanded = node.expanded == null ? true : node.expanded;
        var collapsedClasses = getCollapsedClasses(isExpanded, sockets);
        
        var api = {
            entered: () => targetDropNode != null,
            onenter: function(e) {
                if(targetDragNode != null) {
                    var dragObject = $('.dragObject');
                    if(dragObject[0] != null) {
                        dragObject.addClass('nestable');
                    }
                    targetDropElement = e.target;
                    targetDropNode = node;
                    targetDropNodeIndex = e.dropIndex;
                }
            },
            onleave: function(e) {
                if(targetDropNode != null && targetDropNode.id == node.id) {
                    targetDropNode = null;
                    targetDropElement = null;
                    var dragObject = $('.dragObject');
                    if(dragObject[0] != null) {
                        dragObject.removeClass('nestable');
                    }
                }
            }
        };

        var cEle = [];
        if(mdle.component != null)
        {
            var nodeId = btoa(encodeId(node.action));
            if(!nodeComponents.hasOwnProperty(nodeId)) {
                nodeComponents[nodeId] = mdle.component;
            }
        
            cEle = m(nodeComponents[nodeId], {
                renderNodes,
                modules,
                defaults,
                items,
                node,
                api
            }, []);
        }

        var collapsedNodeClasses = getCollapsedClasses(isExpanded, { inbound: cEle });

        return [
            m('div', { class: 'handle', onmousedown: startNodeDrag }),
            m('div', { class: 'workflow-node-name', ondblclick: toggleExpandableNode }, [node.name]),
            m('div', { class: ['sockets_container', collapsedClasses].join(' ') }, [
                m('div', { class: 'pull-left' }, m('ul', sockets.inbound)),
                m('div', { class: 'pull-right' }, m('ul', sockets.outbound)),
                m('div', { class: 'clearfix' })
            ]),
            m('div', { class: ['prototype_container', collapsedNodeClasses].join(' ') }, [
                m('div', { class: 'prototype-model-container' }, cEle)
            ])
        ]
    },
    renderSockets: (mdle, node, defaults) => {
        var inboundSockets = [];
        var outboundSockets = [];

        if(mdle.connections != null) {
            for(var j = 0; j < mdle.connections.length; ++j) {
                var con = mdle.connections[j];
                var id = ([node.action, con.direction, con.name].join('.'));
                var defaultValue = null;
                for(var key in defaults) {
                    if(id == key) {
                        defaultValue = defaults[key];
                        break;
                    }
                }

                var classes = ['workflow-node-socket',`node-${node.id}`,encodeId(id)].join(' ');
                var tooltip = null;

                if(defaultValue != null) {
                    tooltip = m('div', { class: ['default-value', con.direction].join(' ') }, [
                        m('span', { class: 'default-value-tooltip' }, [defaultValue, m('i', { class: 'icon fa fa-pencil'})])
                    ]);
                }
                var socket = m('div', { class: classes }, [tooltip]);
                if(con.direction == 'outbound') {
                    outboundSockets.push(
                        m('li', [con.name, socket])
                    );
                } else if (con.direction == 'inbound') {
                    inboundSockets.push(
                        m('li', [socket, con.name])
                    );
                }
            }
        }
        return { inbound: inboundSockets, outbound: outboundSockets };
    },
    renderConnections: (modules, dom, items, bindings) => {
        var domPos = $(dom).offset();
        if(domPos == null) {
            return [];
        }

        var connections = getConnections(bindings, items);
        var fromVerticalCount = {};
        var connectionEles = [];

        for(var i = 0; i < connections.length; ++i) {
            var conn = connections[i];
            var fromEle = $(`.${encodeId(conn[0].socket)}.node-${conn[0].node}`);
            var toEle = $(`.${encodeId(conn[1].socket)}.node-${conn[1].node}`);

            var fromElePos = fromEle.offset();
            if(fromElePos == null) {
                continue;
            }
            var fromId = `${fromElePos.left},${fromElePos.top}`.toString();
            if(!fromVerticalCount.hasOwnProperty(fromId)) {
                fromVerticalCount[fromId] = 0;
            }

            var toElePos = toEle.offset();

            toElePos.left -= domPos.left;
            toElePos.top -= domPos.top;

            fromElePos.left -= domPos.left;
            fromElePos.top -= domPos.top;

            toElePos.top += 4;
            toElePos.left += 4;
            fromElePos.top += fromVerticalCount[fromId] * 4;
            fromElePos.left += 4;

            connectionEles.push(
                m('polyline', {
                    points: [
                        /* from node middle */ [fromElePos.left, fromElePos.top].join(' '),
                        /* to node middle */ [toElePos.left, toElePos.top].join(' ')
                    ].join(','),
                    'z-index': 10,
                    fill: "none",
                    stroke: 'rgba(255, 255, 255, 0.5)',
                    'stroke-linecap': 'round',
                    'stroke-width': 2
                })
            )
            
            fromVerticalCount[fromId]++;
        }
        return connectionEles;
    },
    renderForwards: (modules, dom, items) => {
        var domPos = $(dom).offset();

        var forwards = [];
        for(var i = 0; i < items.length; ++i) {
            var item = items[i];
            if(items[i] == null) {
                continue;
            }
            var mdle = getModule(modules, item.action);
            var fromEle = dom.find('.workflow-node.node_'+item.id);
            if(fromEle.length == 0) {
                continue;
            }
            var fromElePos = fromEle.offset();
            fromElePos.left -= domPos.left;
            fromElePos.top -= domPos.top;
            fromElePos.top += fromEle.outerHeight() * 0.5;
            fromElePos.left += fromEle.outerWidth();

            if(item.forward != null && Array.isArray(item.forward)) {
                for(var j = 0; j < item.forward.length; ++j) {
                    var forwardItemPointer = item.forward[j];
                    var forwardItem = items[forwardItemPointer.id];
                    var toEle = dom.find('.workflow-node.node_'+forwardItem.id);

                    var toElePos = toEle.offset();
                    var toElementHalfWidth = toEle.outerWidth() * 0.5;
                    toElePos.left -= domPos.left;
                    toElePos.top -= domPos.top;
                    toElePos.left += toElementHalfWidth;

                    var dis = ((fromElePos.left + (toElePos.left - toElementHalfWidth)) * 0.5) - fromElePos.left;

                    forwards.push(
                        m('polyline', {
                            'stroke-dasharray': '2.5, 10',
                            points: [
                                /* from node top-middle */ fromElePos.left+' '+fromElePos.top,
                                /* from node to top-node-padded-top */ (fromElePos.left+dis)+' '+fromElePos.top,
                                /* from node to top-node-padded-top */ (fromElePos.left+dis)+' '+(toElePos.top - 25),
                                /* from node to top-node-padded-top */ toElePos.left+' '+(toElePos.top - 25),
                                /* to node top-middle */ toElePos.left+' '+(toElePos.top - 15)
                            ].join(','),
                            fill: "none",
                            stroke: mdle.type == 'event' ? 'green' : 'gold',
                            'stroke-linecap': 'round',
                            'stroke-width': 5,
                            'marker-end': "url(#"+mdle.type+"Arrow)",
                        })
                    )
                }
            }
        }

        return forwards;
    }
};

function renderSvgLines(vnode) {
    var dom = $(vnode.dom);
    var svg = dom.find('svg');

    var modules = vnode.attrs.modules;
    var data = vnode.attrs.content;

    var items = getWorkflowNodes(data.workflow);
    var connections = renderNodes.renderConnections(modules, dom, items, data.bindings);
    var forwards = renderNodes.renderForwards(modules, dom, items);
    
    m.render(svg[0], [
            m('defs', [
                m('marker', { id: "eventArrow", markerWidth: 10, markerHeight: 10, refX: 0, refY: 3, orient: 'auto', markerUnits: 'strokeWidth', viewBox: '0 0 20 20'}, [
                    m('path', { d: "M0,0 L0,6 L4,3 z", fill: 'green' })
                ]),
                m('marker', { id: "actionArrow", markerWidth: 10, markerHeight: 10, refX: 0, refY: 3, orient: 'auto', markerUnits: 'strokeWidth', viewBox: '0 0 20 20'}, [
                    m('path', { d: "M0,0 L0,6 L4,3 z", fill: 'gold' })
                ])
            ])
        ]
        .concat(forwards)
        .concat(connections)
    );
}

const WorkflowComponent = {
    oncreate: (vnode) => {
        $(vnode.dom).data('component', vnode);
        renderSvgLines(vnode);
    },

    view: (vnode) => {
        var modules = vnode.attrs.modules;
        var data = vnode.attrs.content;
        var items = [];
        for(var i = 0; i < data.workflow.length; ++i) {
            var wfi = data.workflow[i];
            items[wfi.id] = wfi;
        }

        var defaults = getDefaults(modules, data.bindings, items);
    
        var nodes = [
            m('svg', { xmlns: 'http://www.w3.org/2000/svg' }, [])
        ];
        for(var i = 0; i < items.length; ++i) {
            var node = items[i];
            if(items[i] == null) {
                continue;
            }
            if(node.root) {
                nodes.push(
                    renderNodes.node(modules, items, defaults, node, true)
                );
            }
        }

        var nodeLibrary = [];
        for(var moduleName in modules) {
            var actions = modules[moduleName].exports;
            nodeLibrary.push(m('div', {class:'module'} ,[moduleName]));
            for(var actionName in actions) {
                var action = actions[actionName];
                nodeLibrary.push(m('div', {onmousedown: startNodeDrag, 'data-type': action.type, 'data-name': action.name, 'data-action': [moduleName,actionName].join('.'), class:['module-action',action.type].join(' ')}, [action.name||actionName]));
            }
        }

        var dragObject = m('div', { class: 'dragObject hidden' });
        
        return m(DockerComponent, [
            m('div', { class: 'workflow', dock: 'left', weight: 0.8 }, [nodes, dragObject]),
            m('div', { class: 'explorer', dock: 'right', weight: 0.2 }, nodeLibrary)  
        ]);
    }
}

export default WorkflowComponent;