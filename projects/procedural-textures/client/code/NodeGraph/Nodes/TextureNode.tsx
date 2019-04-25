import { PrimitiveNodeRendererProps, PrimitiveNodeRenderer, PrimitiveNode, RendererInterface } from "./PrimitiveNode";
import React = require("react");
import { PrimitiveNodeConfig, NodeGraphRenderer } from "../NodeGraph";
import { NodeGraphNamespace } from "../NodeGraphNamespace";

export interface TextureNodeRendererProps extends PrimitiveNodeRendererProps {
    node: TextureNode;
}

export interface TextureNodeRendererState {
    width: number;
    height: number;
}

export class TextureNodeRenderer extends React.Component<TextureNodeRendererProps, TextureNodeRendererState> implements RendererInterface {
    private primitiveNodeRenderer: PrimitiveNodeRenderer;

    constructor(props: TextureNodeRendererProps) {
        super(props);
        this.state = {
            width: this.props.node.width,
            height: this.props.node.height
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

    renderToCanvas(canvas: HTMLCanvasElement) {
        if(canvas == null) {
            return; 
        }
        this.props.node.renderToCanvas(canvas);
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
            >
                <div className="previewTexture">
                    <canvas ref={canvas => this.renderToCanvas(canvas)} />
                </div>
                {this.props.children}
            </PrimitiveNodeRenderer>
        );
    }
}

export interface TextureNodeConfig extends PrimitiveNodeConfig {
    width: number;
    height: number;
}

export class TextureNode extends PrimitiveNode {
    width: number;
    height: number;
    constructor(config: TextureNodeConfig) {
        super(config);
        this.width = config.width || 128;
        this.height = config.height || 128;
        this.nodeType = 'TextureNode';
        this.addAttribute({ name: 'texture.width', type: 'number', expression: '$.width', read_only: true });
        this.addAttribute({ name: 'texture.height', type: 'number', expression: '$.height', read_only: true });
    }

    serialize() {
        return { ...super.serialize(), width: this.width, height: this.height };
    }

    interface(nodeGraphRenderer: NodeGraphRenderer) {
        return <TextureNodeRenderer
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

    renderToCanvas(canvas: HTMLCanvasElement) {
        canvas.width = this.width;
        canvas.height = this.height;  
    }
}