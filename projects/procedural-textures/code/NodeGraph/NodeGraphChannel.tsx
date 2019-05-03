import { NodeGraphAttributes, NodeGraphAssetEventHandler, ISerializable, INodeGraphAsset, NodeGraphAttribute } from "./NodeGraph";
import React = require("react");
import { PrimitiveNode, RendererInterface } from "./Nodes/PrimitiveNode";
import { NodeGraphNamespace } from "./NodeGraphNamespace";

export interface NodeGraphChannelOptions {
    direction: NodeGraphChannelDirection;
    name: string;
    attributes?: NodeGraphAttribute[];
    node?: PrimitiveNode;
}

export class NodeGraphChannel implements INodeGraphAsset, ISerializable {
    readonly attributes: NodeGraphAttributes;
    readonly node: PrimitiveNode;
    readonly direction: NodeGraphChannelDirection;
    name: string;

    constructor(options: NodeGraphChannelOptions) {
        options = options || { direction: NodeGraphChannelDirection.Undefined, name: 'Undefined' };

        this.name = options.name;
        this.direction = options.direction;
        this.node = options.node || null;
        this.attributes = {};
        if(options.attributes != null) {
            for(var i = 0; i < options.attributes.length; ++i) {
                var attribute = options.attributes[i];
                this.attributes[attribute.name] = { ...attribute, object: this };
            }
        }
    }

    serialize() {
        var attributes = [];
        for(var attributeName in this.attributes) {
            attributes.push({
                name: attributeName,
                expression: this.attributes[attributeName].expression,
                type: this.attributes[attributeName].type,
                read_only: this.attributes[attributeName].read_only
            });
        }
        return {
            attributes,
            direction: this.direction,
            name: this.name
        }
    }

    applyAttributes(attributes: any[]) {
        if(attributes == null) {
            return;
        }
        for(var i = 0; i < attributes.length; ++i) {
            var attr = attributes[i];
            if(this.attributes.hasOwnProperty(attr.name)) {
                this.attributes[attr.name].expression = attr.expression;
                this.attributes[attr.name].read_only = attr.read_only;
                this.attributes[attr.name].type = attr.type;
            } else {
                this.attributes[attr.name] = { ...attr, object: this };
            }
        }
    }
}

export interface NodeGraphChannels {
    [name: string]: NodeGraphChannel;
}

export interface IComposableNode {
    inputs: NodeGraphChannels;
    outputs: NodeGraphChannels;
}


export enum NodeGraphChannelDirection {
    Outbound,
    Inbound,
    Undefined
}

export interface ChannelMouseEventHandler {
    (id: string, x: number, y: number): void;
}

export interface NodeChannelRendererProps {
    channel: NodeGraphChannel;
    entityClicked: NodeGraphAssetEventHandler;
    showLabel: boolean;
    onMouseDown?: ChannelMouseEventHandler;
    onMouseUp?: ChannelMouseEventHandler;
}

export interface NodeChannelRendererState {
    direction: NodeGraphChannelDirection;
    attributes: NodeGraphAttributes;
    name: string;
    selected: boolean;
}

export class NodeChannelRenderer extends React.Component<NodeChannelRendererProps, NodeChannelRendererState> implements RendererInterface {
    constructor(props: NodeChannelRendererProps) {
        super(props);
        this.state = {
            name: props.channel.name,
            direction: props.channel.direction,
            attributes: props.channel.attributes,
            selected: false
        };
    }

    updateState(channel: NodeGraphChannel) {
        this.setState({
            name: channel.name,
            direction: channel.direction,
            attributes: channel.attributes
        });
    }

    channelClicked(e: React.MouseEvent<HTMLDivElement>) {
        if(e.button == 0) {
            this.props.entityClicked(e.currentTarget.id);
            this.setState({ selected: !this.state.selected });
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }

    onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        if(
            e.button == 0 &&
            this.props.onMouseDown != null
        ) {
            this.props.onMouseDown(e.currentTarget.id, e.clientX, e.clientY);
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }

    onMouseUp(e: React.MouseEvent<HTMLDivElement>) {
        if(
            e.button == 0 &&
            this.props.onMouseUp != null
        ) {
            this.props.onMouseUp(e.currentTarget.id, e.clientX, e.clientY);
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }

    render() {
        var channelNamespace = NodeGraphNamespace.getChannelNamespace(this.props.channel);
        return <li>
            <div
                onClick={(e) => this.channelClicked(e)}
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseUp={(e) => this.onMouseUp(e)}
                id={channelNamespace}
                className={`${this.state.selected ? 'selected' : ''} ${this.props.showLabel ? 'forceLabel' : ''}`}
            >
                <span>{this.state.name}</span>
            </div>
        </li>;
    }
}