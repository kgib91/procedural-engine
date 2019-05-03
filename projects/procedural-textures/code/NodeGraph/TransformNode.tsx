import { IVector2, PrimitiveNodeConfig } from "./NodeGraph";
import { TextureNodeRendererProps, TextureNodeRendererState, TextureNodeRenderer, TextureNode, TextureNodeConfig } from "./Nodes/TextureNode";
import React = require("react");
import { NodeGraphChannelDirection } from "./NodeGraphChannel";
import { NodeGraphExpression } from "./NodeGraphExpression";
import { NodeGraphValidator } from "./NodeGraphValidator";
import { RendererInterface } from "./Nodes/PrimitiveNode";

export interface TransformNodeRendererProps extends TextureNodeRendererProps {
    node: TransformNode;
}

export interface TransformNodeRendererState extends TextureNodeRendererState {
    scale: IVector2;
    offset: IVector2;
}

export class TransformNodeRenderer extends React.Component<TransformNodeRendererProps, TransformNodeRendererState> implements RendererInterface {
    private textureNodeRenderer: TextureNodeRenderer;

    constructor(props: TransformNodeRendererProps) {
        super(props);
        this.state = {
            width: this.props.node.width,
            height: this.props.node.height,
            scale: this.props.node.transform.scale,
            offset: this.props.node.transform.offset
        };
    }

    updateState(node: TransformNode) {
        var updatedValues = {
            width: node.width,
            height: node.height,
            scale: node.transform.scale,
            offset: node.transform.offset
        };

        this.setState(updatedValues);

        if(this.textureNodeRenderer != null) {
            this.textureNodeRenderer.updateState(node);
        }
    }

    render() {
        return <TextureNodeRenderer
                    ref={(ref) => this.textureNodeRenderer = ref}
                    assetClicked={this.props.assetClicked}  
                    assetChanged={this.props.assetChanged}
                    onTitleHover={this.props.onTitleHover}
                    channelMouseDown={this.props.channelMouseDown}
                    channelMouseUp={this.props.channelMouseUp}
                    node={this.props.node}
                >
                </TextureNodeRenderer>;
    }
}

export interface NodeTransform {
    scale: IVector2;
    offset: IVector2;
}

export interface TransformNodeConfig extends TextureNodeConfig {
    transform?: NodeTransform;
}

export class TransformNode extends TextureNode {
    transform: NodeTransform;

    constructor(config: TransformNodeConfig) {
        super(config);
        this.nodeType = 'TransformNode';
        this.transform = config.transform || { scale: { x: 1, y: 1 }, offset: { x: 0, y: 0 }};
        this.addChannel({ name: 'input_sampler', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'transformed_sampler', attributes: [{ name: 'value', type: 'sampler2d', expression: `#${this.id}_TransformedSampler` }], direction: NodeGraphChannelDirection.Outbound});
    }

    serialize() {
        return { ...super.serialize(), transform: this.transform };
    }

    renderToCanvas(canvas: HTMLCanvasElement) {
        super.renderToCanvas(canvas);
        canvas.id = `${this.id}_TransformedSampler`;
        var inputTextureAttribute = this.getChannelAttribute('input_sampler', 'value', NodeGraphChannelDirection.Inbound);
        var sourceTextureAttribute = this.nodeGraph.getSourceOfTargetAttribute(inputTextureAttribute);
        if(sourceTextureAttribute != null) {
            var sourceTexture = NodeGraphExpression.evaluate(this.nodeGraph, sourceTextureAttribute.expression);
            if(
                sourceTexture != null &&
                NodeGraphValidator.validateType(sourceTexture, inputTextureAttribute.type)
            ) {
                var canvasContext = canvas.getContext('2d');
                var sourceCanvas = sourceTexture as HTMLCanvasElement;
               
                // canvas of source to transform
                var newCanvas = document.createElement('canvas') as HTMLCanvasElement;
                newCanvas.width = canvas.width;
                newCanvas.height = canvas.height;
                var newCanvasContext = newCanvas.getContext('2d');
                newCanvasContext.drawImage(sourceCanvas, 0, 0);

                // transform onto 
                canvasContext.save();
                canvasContext.scale(this.transform.scale.x, this.transform.scale.y);
                canvasContext.translate(this.transform.offset.x, this.transform.offset.y);
                canvasContext.drawImage(newCanvas, 0, 0);
                canvasContext.restore();
            }
        }
    }
}