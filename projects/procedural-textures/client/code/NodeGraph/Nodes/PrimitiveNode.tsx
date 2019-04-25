import { NodeGraphAssetEventHandler, INodeState, INodeGraphRendererInterface, IVector2, NodeGraphAttributes, NodeGraph, PrimitiveNodeConfig, NodeGraphAttribute, NodeGraphRenderer, NodeGraphAssetChangedHandler, EntityHoverEventHandler, ISerializable } from "../NodeGraph";
import { IComposableNode, NodeChannelRenderer, NodeGraphChannels, NodeGraphChannelDirection, NodeGraphChannelOptions, NodeGraphChannel, ChannelMouseEventHandler } from "../NodeGraphChannel";
import React = require("react");
import { NodeGraphNamespace } from "../NodeGraphNamespace";
import * as uuidv4 from "uuid/v4";

export interface PrimitiveNodeRendererProps {
    node: PrimitiveNode;
    assetClicked: NodeGraphAssetEventHandler;
    channelMouseDown: ChannelMouseEventHandler;
    channelMouseUp: ChannelMouseEventHandler;
    onTitleHover: EntityHoverEventHandler;
    assetChanged: NodeGraphAssetChangedHandler;
    channelLabels?: NodeGraphChannelDirection;
}

export interface PrimitiveNodeRendererState extends INodeState, IComposableNode {
    selected: boolean;
    mouseDragging: boolean;
    dragStart: { x: number, y: number };
    hoveringTitle: boolean;
}

export interface RendererInterface {
    updateState(node: any);
}

export class PrimitiveNodeRenderer extends React.Component<PrimitiveNodeRendererProps, PrimitiveNodeRendererState> implements RendererInterface {
    private inputChannelRenderers: { [name: string]: NodeChannelRenderer };
    private outputChannelRenderers: { [name: string]: NodeChannelRenderer };
    private nodeContainerRef: HTMLDivElement;

    constructor(props: PrimitiveNodeRendererProps) {
        super(props);
        this.state = {
            id: props.node.id,
            coordinate: props.node.coordinate,
            name: props.node.name,
            attributes: props.node.attributes,
            outputs: props.node.outputs,
            inputs: props.node.inputs,
            selected: false,
            mouseDragging: false,
            hoveringTitle: false,
            dragStart: { x: 0, y: 0 }
        };
        this.inputChannelRenderers = {};
        this.outputChannelRenderers = {};
    }

    updateState(node: PrimitiveNode) {
        // deferred update
        setTimeout(() => {
            var updatedValues = {
                id: node.id,
                coordinate: node.coordinate,
                name: node.name,
                attributes: node.attributes,
                outputs: node.outputs,
                inputs: node.inputs
            };

            for (var channel in this.inputChannelRenderers) {
                if (
                    this.inputChannelRenderers.hasOwnProperty(channel) &&
                    node.inputs.hasOwnProperty(channel) &&
                    this.outputChannelRenderers[channel] != null &&
                    node.outputs[channel] != null
                ) {
                    this.inputChannelRenderers[channel].updateState(node.inputs[channel]);
                } else {
                    delete this.inputChannelRenderers[channel];
                }
            }
            for (var channel in this.outputChannelRenderers) {
                if (
                    this.outputChannelRenderers.hasOwnProperty(channel) &&
                    node.outputs.hasOwnProperty(channel) &&
                    this.outputChannelRenderers[channel] != null &&
                    node.outputs[channel] != null
                ) {
                    this.outputChannelRenderers[channel].updateState(node.outputs[channel]);
                } else {
                    delete this.outputChannelRenderers[channel];
                }
            }

            this.setState(updatedValues);
        }, 1)
    }

    nodeClicked(e: MouseEvent) {
        if (e.button == 0) {
            this.props.assetClicked((e.currentTarget as HTMLDivElement).id);
            this.setState({ selected: !this.state.selected });
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }

    startDrag(event: React.MouseEvent<HTMLSpanElement>) {
        if (event.button == 0) {
            var { clientX, clientY } = event;
            this.setState({
                ...this.state,
                dragStart: { x: clientX, y: clientY },
                mouseDragging: true
            });
        }
    }

    updateDrag(event: MouseEvent) {
        if (!this.state.mouseDragging) {
            return true;
        }
        if (event.button == 0) {
            var { clientX, clientY } = event;
            this.setState({
                ...this.state,
                coordinate: {
                    x: this.props.node.coordinate.x + ((clientX) - this.state.dragStart.x),
                    y: this.props.node.coordinate.y + ((clientY) - this.state.dragStart.y)
                }
            });
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            return false;
        }
        return true;
    }

    completeDrag(event: MouseEvent) {
        if (!this.state.mouseDragging) {
            return true;
        }

        if (event.button == 0) {
            var { clientX, clientY } = event;
            var newX = this.props.node.coordinate.x + ((clientX) - this.state.dragStart.x);
            var newY = this.props.node.coordinate.y + ((clientY) - this.state.dragStart.y);
            this.props.node.coordinate = {
                x: newX,
                y: newY
            };
            this.setState({
                ...this.state,
                mouseDragging: false
            });
            this.props.assetChanged(
                NodeGraphNamespace.getNodeNamespace(this.props.node),
                this.props.node
            );
            event.stopPropagation();
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }

        return true;
    }

    private readonly _mouseMoveBinding = (e) => this.updateDrag(e);
    private readonly _mouseUpBinding = (e) => this.completeDrag(e);
    private readonly _nodeClickBinding = (e) => this.nodeClicked(e);

    private onEnterTitle(id: string) {
        if (
            !this.state.hoveringTitle &&
            this.props.onTitleHover != null
        ) {
            this.props.onTitleHover('node', id, true);
            this.setState({
                hoveringTitle: true
            })
        }
    }

    private onLeaveTitle(id: string) {
        if (
            this.state.hoveringTitle &&
            this.props.onTitleHover != null
        ) {
            this.props.onTitleHover('node', id, false);
            this.setState({
                hoveringTitle: false
            })
        }
    }

    componentDidMount() {
        console.log('mount');
        document.addEventListener('mousemove', this._mouseMoveBinding);
        document.addEventListener('mouseup', this._mouseUpBinding);
        if (this.nodeContainerRef != null) {
            this.nodeContainerRef.addEventListener('click', this._nodeClickBinding);
        }
    }

    componentWillUnmount() {
        console.log('unmount');
        document.removeEventListener('mousemove', this._mouseMoveBinding);
        document.removeEventListener('mouseup', this._mouseUpBinding);
        if (this.nodeContainerRef != null) {
            this.nodeContainerRef.removeEventListener('click', this._nodeClickBinding);
        }
    }

    render() {
        var outboundAttributes = [];
        var inboundAttributes = [];
        var i = 0;
        for (var prop in this.state.outputs) {
            if (this.state.outputs.hasOwnProperty(prop)) {
                ((channelName) => {
                    var channel = this.state.outputs[channelName];
                    outboundAttributes.push(
                        <NodeChannelRenderer
                            showLabel={this.props.channelLabels != null ? (this.props.channelLabels == NodeGraphChannelDirection.Outbound) : false}
                            ref={(ref) => this.outputChannelRenderers[channelName] = ref}
                            entityClicked={this.props.assetClicked}
                            onMouseDown={this.props.channelMouseDown}
                            onMouseUp={this.props.channelMouseUp}
                            key={i++}
                            channel={channel}
                        />
                    );
                })(prop);
            }
        }
        i = 0;
        for (var prop in this.state.inputs) {
            if (this.state.inputs.hasOwnProperty(prop)) {
                ((channelName) => {
                    var channel = this.state.inputs[channelName];
                    inboundAttributes.push(
                        <NodeChannelRenderer
                            showLabel={this.props.channelLabels != null ? (this.props.channelLabels == NodeGraphChannelDirection.Inbound) : false}
                            ref={(ref) => this.inputChannelRenderers[channelName] = ref}
                            entityClicked={this.props.assetClicked}
                            onMouseDown={this.props.channelMouseDown}
                            onMouseUp={this.props.channelMouseUp}
                            key={i++}
                            channel={channel}
                        />
                    );
                })(prop);
            }
        }
        return (
            <div
                ref={(ref) => this.nodeContainerRef = ref}
                className={`node ${this.state.selected ? 'selected' : ''} ${this.state.mouseDragging ? 'dragging' : ''}`}
                id={NodeGraphNamespace.getNodeNamespace(this.props.node)}
                style={{ top: this.state.coordinate.y, left: this.state.coordinate.x }}
            >
                <div
                    className="primitiveNode"
                >
                    <span
                        className="name"
                        onMouseEnter={(e) => this.onEnterTitle(this.props.node.id)}
                        onMouseLeave={(e) => this.onLeaveTitle(this.props.node.id)}
                        onMouseDown={(e) => this.startDrag(e)}
                    >
                        {this.state.name}
                    </span>
                    {this.props.children}
                </div>
                <div className="nodeChannelOverlay">
                    <ul className="nodeAttributes outbound">
                        {outboundAttributes}
                    </ul>
                    <ul className="nodeAttributes inbound">
                        {inboundAttributes}
                    </ul>
                </div>
            </div>
        );
    }
}

export class PrimitiveNode implements INodeState, INodeGraphRendererInterface, ISerializable {
    nodeType: string;
    readonly id: string;
    coordinate: IVector2;
    name: string;
    readonly attributes: NodeGraphAttributes;
    readonly inputs: NodeGraphChannels;
    readonly outputs: NodeGraphChannels;
    nodeGraph: NodeGraph;

    constructor(config: PrimitiveNodeConfig) {
        this.name = config.name;
        this.id = config.id || uuidv4();
        this.coordinate = config.coordinate || { x: 0, y: 0 };
        this.nodeGraph = config.nodeGraph;
        this.outputs = {};
        this.inputs = {};
        this.attributes = {};
        this.nodeType = 'PrimitiveNode';
        this.addAttribute({ name: 'base.id', type: 'string', expression: '$.id', read_only: true });
        this.addAttribute({ name: 'base.name', type: 'string', expression: '$.name' });

        this.applyAttributes(config.attributes);
        this.applyChannels(config.channels);
    }

    applyChannels(channels: any[]) {
        if (channels == null) {
            return;
        }
        for (var i = 0; i < channels.length; ++i) {
            var channel = channels[i] as any;
            if (channel.direction == NodeGraphChannelDirection.Inbound) {
                if (this.inputs.hasOwnProperty(channel.name)) {
                    this.inputs[channel.name].name = channel.name;
                    this.inputs[channel.name].applyAttributes(channel.attributes);
                } else {
                    this.addChannel({ ...channel });
                }
            } else if (channel.direction == NodeGraphChannelDirection.Outbound) {
                if (this.outputs.hasOwnProperty(channel.name)) {
                    this.outputs[channel.name].name = channel.name;
                    this.outputs[channel.name].applyAttributes(channel.attributes);
                } else {
                    this.addChannel({ ...channel });
                }
            }
        }
    }

    applyAttributes(attributes: any[]) {
        if (attributes == null) {
            return;
        }
        for (var i = 0; i < attributes.length; ++i) {
            var attr = attributes[i];
            if (this.attributes.hasOwnProperty(attr.name)) {
                this.attributes[attr.name].expression = attr.expression;
                this.attributes[attr.name].read_only = attr.read_only;
                this.attributes[attr.name].type = attr.type;
            } else {
                this.addAttribute(attr);
            }
        }
    }

    getInboundLinkPaths(): string[] {
        var inputs = [];
        for (var name in this.inputs) {
            var input = this.inputs[name];
            if (input.direction == NodeGraphChannelDirection.Inbound) {
                var namespace = NodeGraphNamespace.getChannelNamespace(input);
                inputs.push(`${namespace}/@value`)
            }
        }
        return inputs;
    }

    serialize(): any {
        var channels = [];
        for (var channelName in this.inputs) {
            channels.push(this.inputs[channelName].serialize());
        }
        for (var channelName in this.outputs) {
            channels.push(this.outputs[channelName].serialize());
        }
        var attributes = [];
        for (var attributeName in this.attributes) {
            attributes.push({
                name: attributeName,
                expression: this.attributes[attributeName].expression,
                type: this.attributes[attributeName].type,
                read_only: (this.attributes[attributeName].read_only === true || (this.attributes[attributeName].read_only as any) === 'true')
            });
        }
        return {
            name: this.name,
            id: this.id,
            coordinate: this.coordinate,
            attributes,
            channels,
            nodeType: this.nodeType
        };
    }

    addAttribute(options: NodeGraphAttribute) {
        this.attributes[options.name] = { ...options, object: this };
    }

    removeAttribute(name: string) {
        delete this.attributes[name];
    }

    getChannelAttribute(channel: string, attribute: string, direction: NodeGraphChannelDirection): NodeGraphAttribute {
        switch (direction) {
            case NodeGraphChannelDirection.Inbound: {
                return this.inputs[channel].attributes[attribute];
            }
            case NodeGraphChannelDirection.Outbound: {
                return this.outputs[channel].attributes[attribute];
            }
        }
        return null;
    }

    addChannel(options: NodeGraphChannelOptions) {
        switch (options.direction) {
            case NodeGraphChannelDirection.Inbound: {
                this.inputs[options.name] = new NodeGraphChannel({ ...options, node: this });
                break;
            }
            case NodeGraphChannelDirection.Outbound: {
                this.outputs[options.name] = new NodeGraphChannel({ ...options, node: this });
                break;
            }
        }
    }

    removeChannel(name: string, direction: NodeGraphChannelDirection) {
        switch (direction) {
            case NodeGraphChannelDirection.Inbound: {
                for (var inputName in this.inputs) {
                    if (this.inputs.hasOwnProperty(inputName)) {
                        if (inputName.indexOf(name) >= 0) {
                            delete this.inputs[inputName];
                        }
                    }
                }
                break;
            }
            case NodeGraphChannelDirection.Outbound: {
                for (var outputName in this.outputs) {
                    if (this.outputs.hasOwnProperty(outputName)) {
                        if (outputName.indexOf(name) >= 0) {
                            delete this.outputs[outputName];
                        }
                    }
                }
                break;
            }
        }
    }

    interface(nodeGraphRenderer: NodeGraphRenderer) {
        return <PrimitiveNodeRenderer
            ref={(ref) => nodeGraphRenderer.registerNodeReference(NodeGraphNamespace.getNodeNamespace(this), ref)}
            assetClicked={(id) => nodeGraphRenderer.onAssetClicked(id)}
            onTitleHover={(type, id, hovering) => nodeGraphRenderer.onEntityHover(type, id, hovering)}
            channelMouseDown={(id, x, y) => nodeGraphRenderer.onChannelDown(id, x, y)}
            channelMouseUp={(id, x, y) => nodeGraphRenderer.onChannelUp(id, x, y)}
            assetChanged={(namespace, state) => nodeGraphRenderer.onAssetChanged(namespace, state)}
            key={this.id}
            node={this}
        />
    }
}