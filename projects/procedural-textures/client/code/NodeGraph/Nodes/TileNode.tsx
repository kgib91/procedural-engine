import { TextureNode, TextureNodeRenderer, TextureNodeRendererState, TextureNodeRendererProps, TextureNodeConfig } from "./TextureNode";
import { IVector2, PrimitiveNodeConfig } from "../NodeGraph";
import React = require("react");
import { NodeGraphValidator } from "../NodeGraphValidator";
import { NodeGraphExpression } from "../NodeGraphExpression";
import { NodeGraphChannelDirection } from "../NodeGraphChannel";
import { RendererInterface } from "./PrimitiveNode";

export interface TileNodeRendererProps extends TextureNodeRendererProps {
    node: TileNode;
}

export interface TileNodeRendererState extends TextureNodeRendererState {
    repeat: IVector2;
}

export class TileNodeRenderer extends React.Component<TileNodeRendererProps, TileNodeRendererState> implements RendererInterface {
    private textureNodeRenderer: TextureNodeRenderer;

    constructor(props: TileNodeRendererProps) {
        super(props);
        this.state = {
            width: this.props.node.width,
            height: this.props.node.height,
            repeat: this.props.node.tile_properties.repeat
        };
    }

    updateState(node: TileNode) {
        var updatedValues = {
            width: node.width,
            height: node.height,
            repeat: this.props.node.tile_properties.repeat
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

export interface NodeTileProperties {
    repeat: IVector2;
}

export interface TileNodeConfig extends TextureNodeConfig {
    tile_properties?: NodeTileProperties;
}

export class TileNode extends TextureNode {
    tile_properties: NodeTileProperties;

    constructor(config: TileNodeConfig) {
        super(config);
        this.nodeType = 'TileNode';
        this.tile_properties = config.tile_properties || { repeat: { x: 1, y: 1 }};
        this.addChannel({ name: 'input_sampler', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound});
        this.addChannel({ name: 'tiled_sampler', attributes: [{ name: 'value', type: 'sampler2d', expression: `#${this.id}_TiledSampler` }], direction: NodeGraphChannelDirection.Outbound});
    }

    serialize() {
        return { ...super.serialize(), tile_properties: this.tile_properties };
    }

    renderToCanvas(canvas: HTMLCanvasElement) {
        super.renderToCanvas(canvas);
        canvas.id = `${this.id}_TiledSampler`;
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
                canvasContext.scale(1 / this.tile_properties.repeat.x, 1 / this.tile_properties.repeat.y)
                var tX = Math.ceil(this.tile_properties.repeat.x);
                var tY = Math.ceil(this.tile_properties.repeat.y);
                for(var i = 0; i < tX; ++i) {
                    for(var j = 0; j < tY; ++j) {
                        canvasContext.drawImage(newCanvas, i*(this.width), j*(this.height));
                    }
                }
                canvasContext.restore();
            }
        }
    }
}