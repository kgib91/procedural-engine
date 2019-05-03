import { PrimitiveNodeRendererProps, PrimitiveNodeRenderer, PrimitiveNode, RendererInterface } from "./PrimitiveNode";
import React = require("react");
import { PrimitiveNodeConfig } from "../NodeGraph";
import { NodeGraphNamespace } from "../NodeGraphNamespace";
import { NodeGraphChannelDirection } from "../NodeGraphChannel";
import { NodeGraphRenderer } from "../NodeGraphRenderer";

export interface OutboundNodeRendererProps extends PrimitiveNodeRendererProps {
    node: OutboundNode;
}

export interface OutboundNodeRendererState {
}

export class OutboundNodeRenderer extends React.Component<OutboundNodeRendererProps, OutboundNodeRendererState> implements RendererInterface {
    private primitiveNodeRenderer: PrimitiveNodeRenderer;

    constructor(props: OutboundNodeRendererProps) {
        super(props);
        this.state = {
        }
    }

    updateState(node: any) {
        var updatedValues = {
            width: node.width,
            height: node.height
        };
        this.setState(updatedValues);

        if(this.primitiveNodeRenderer != null) {
            this.primitiveNodeRenderer.updateState(node);
        }
    }

    render() {
        return (
            <PrimitiveNodeRenderer
                ref={(ref) => this.primitiveNodeRenderer = ref}
                assetClicked={this.props.assetClicked}
                assetChanged={this.props.assetChanged}
                onTitleHover={this.props.onTitleHover}
                channelMouseDown={this.props.channelMouseDown}
                channelMouseUp={this.props.channelMouseUp}
                node={this.props.node}
                channelLabels={NodeGraphChannelDirection.Inbound}
            >
                {this.props.children}
            </PrimitiveNodeRenderer>
        );
    }
}

export interface OutboundNodeConfig extends PrimitiveNodeConfig {
}

export class OutboundNode extends PrimitiveNode {
    width: number;
    height: number;
    constructor(config: OutboundNodeConfig) {
        super(config);
        this.nodeType = 'OutboundNode';
        this.addChannel({ name: 'color', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'roughness', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'ao', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'normal', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'bump', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'displacement', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'metalness', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
    }

    serialize() {
        return { ...super.serialize(), width: this.width, height: this.height };
    }

    interface(nodeGraphRenderer: NodeGraphRenderer) {
        return <OutboundNodeRenderer
            ref={(ref) => nodeGraphRenderer.registerNodeReference(NodeGraphNamespace.getNodeNamespace(this), ref)}
            assetClicked={(id) => nodeGraphRenderer.onAssetClicked(id)}
            assetChanged={(namespace, state) => nodeGraphRenderer.onAssetChanged(namespace, state)}
            onTitleHover={(type, id, hovering) => nodeGraphRenderer.onEntityHover(type, id, hovering)}
            channelMouseDown={(id, x, y) => nodeGraphRenderer.onChannelDown(id, x, y)}
            channelMouseUp={(id, x, y) => nodeGraphRenderer.onChannelUp(id, x, y)}
            key={this.id}
            node={this}
        />;
    }
}