{
    view: (vnode) => {
        var state = vnode.attrs;
        var api = state.api;

        function onenter(idx) {
            return function(e) {
                e.dropIndex = idx;
                api.onenter(e);
            }
        }

        function onleave(e) {
            api.onleave(e);
        }

        var nodes = [
            m('div', { onmouseenter: onenter(0), onmouseout: onleave, class: [cls,'add','node-drop-receiver','spacer','prototype-node-order'].join(' ') })
        ];
        
        if(state.node.model != null) {
            for(var i = 0; i < state.node.model.length; ++i) {
                var childNode = state.items[state.node.model[i].id];
                var cls = i == (state.node.model.length-1) ? 'add node-drop-receiver' : 'down node-drop-receiver';
                nodes.push(
                    state.renderNodes.node(state.modules, state.items, state.defaults, childNode, false),
                    m('div', { onmouseenter: onenter(i + 1), onmouseout: onleave, class: [cls,'spacer','prototype-node-order'].join(' ') })
                )
            }
        }

        return nodes;
    }
}