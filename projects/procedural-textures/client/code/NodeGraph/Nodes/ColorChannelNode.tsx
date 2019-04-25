import { PrimitiveNodeConfig, NodeGraphRenderer } from "../NodeGraph";
import React = require("react");
import { NodeGraphNamespace } from "../NodeGraphNamespace";
import { NodeGraphChannelDirection } from "../NodeGraphChannel";
import { NodeGraphExpression } from "../NodeGraphExpression";
import { NodeGraphValidator } from "../NodeGraphValidator";
import { enumFlagsToString } from "../../EnumExtensions";
import { RendererInterface } from "./PrimitiveNode";
import { TextureNodeRendererProps, TextureNodeRenderer, TextureNode, TextureNodeConfig } from "./TextureNode";
import Enumerable = require("linq");

export enum ColorMaskFlag {
    R = 1,
    G = 2,
    B = 4,
    A = 8
}

export const ColorMaskFlagAll = ColorMaskFlag.R | ColorMaskFlag.G | ColorMaskFlag.B | ColorMaskFlag.A;

export interface ColorChannelNodeRendererProps extends TextureNodeRendererProps {
    node: ColorChannelNode;
}

export interface ColorChannelNodeRendererState {
    included_channels: ColorMaskFlag[];
}

export class ColorChannelNodeRenderer extends React.Component<ColorChannelNodeRendererProps, ColorChannelNodeRendererState> implements RendererInterface {
    private textureNodeRenderer: TextureNodeRenderer;

    constructor(props: ColorChannelNodeRendererProps) {
        super(props);
        this.state = {
            included_channels: this.props.node.included_channels
        };
    }

    updateState(node: ColorChannelNode) {
        node.updateColorChannels();
        this.setState({
            included_channels: node.included_channels
        });

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
        />;
    }
}

export interface ColorChannelNodeConfig extends TextureNodeConfig {
    included_channels?: ColorMaskFlag[];
}

export class ColorChannelNode extends TextureNode {
    included_channels: ColorMaskFlag[];

    constructor(config: ColorChannelNodeConfig) {
        super(config);
        this.nodeType = 'ColorChannelNode';
        this.included_channels = config.included_channels || [ ColorMaskFlagAll ];
        this.addChannel({ name: 'input_sampler', attributes: [{ name: 'value', type: 'sampler2d' }], direction: NodeGraphChannelDirection.Inbound });
        this.createIncludedChannels();
    }

    serialize() {
        return {
            ...super.serialize(),
            included_channels: Enumerable.from(this.included_channels)
                .select(x => Number(x))
                .toArray()
        };
    }

    updateColorChannels() {
        this.removeChannel('_channel_sampler', NodeGraphChannelDirection.Outbound)
        this.createIncludedChannels();
    }

    interface(nodeGraphRenderer: NodeGraphRenderer) {
        return (
            <ColorChannelNodeRenderer
                ref={(ref) => nodeGraphRenderer.registerNodeReference(NodeGraphNamespace.getNodeNamespace(this), ref)}
                assetClicked={(id) => nodeGraphRenderer.onAssetClicked(id)}
                assetChanged={(namespace, state) => nodeGraphRenderer.onAssetChanged(namespace, state)}
                onTitleHover={(type, id, hovering) => nodeGraphRenderer.onEntityHover(type, id, hovering)}
                channelMouseDown={(id, x, y) => nodeGraphRenderer.onChannelDown(id, x, y)}
                channelMouseUp={(id, x, y) => nodeGraphRenderer.onChannelUp(id, x, y)}
                key={this.id}
                node={this}
            />
        );
    }

    private createIncludedChannels() {
        var usedTags = [];
        for(var i = 0; i < this.included_channels.length; ++i) {
            var colorMask = this.included_channels[i];
            var colorTags = enumFlagsToString(ColorMaskFlag, colorMask)
                .replaceAll('|', '');
            var channelName = `${colorTags.toLowerCase()}_channel_sampler`;
            if(usedTags.indexOf(colorTags) == -1) {
                this.addChannel({ name: channelName, attributes: [{ name: 'value', type: 'sampler2d', expression: `#${this.id}_${colorTags}ChannelSampler` }], direction: NodeGraphChannelDirection.Outbound});
                usedTags.push(colorTags);
            } else {
                this.included_channels.splice(i, 1);
            }
        }
    }

    private copyPixelsWithMask(sourceData, targetData, mask: number) {
        if(sourceData.data.size != targetData.data.size) {
            throw 'Texture size of source does not match size of target';
        }
        var rMask = (mask & ColorMaskFlag.R) ? 0xFF : 0;
        var gMask = (mask & ColorMaskFlag.G) ? 0xFF : 0;
        var bMask = (mask & ColorMaskFlag.B) ? 0xFF : 0;
        var aMask = (mask & ColorMaskFlag.A) ? 0xFF : 0;
        var tData = targetData.data;
        for(var j = 0; j < targetData.data.length; j += 4) {
            tData[j  ] = (sourceData.data[j  ] & rMask) | 0;
            tData[j+1] = (sourceData.data[j+1] & gMask) | 0;
            tData[j+2] = (sourceData.data[j+2] & bMask) | 0;
            tData[j+3] = (sourceData.data[j+3] & aMask) | 0;
        }
    }

    renderToCanvas(canvas: HTMLCanvasElement) {
        super.renderToCanvas(canvas);
        var inputTextureAttribute = this.getChannelAttribute('input_sampler', 'value', NodeGraphChannelDirection.Inbound);
        var sourceTextureAttribute = this.nodeGraph.getSourceOfTargetAttribute(inputTextureAttribute);
        if(sourceTextureAttribute != null) {
            var sourceTexture = NodeGraphExpression.evaluate(this.nodeGraph, sourceTextureAttribute.expression);
            if(
                sourceTexture != null &&
                NodeGraphValidator.validateType(sourceTexture, inputTextureAttribute.type)
            ) {
                var sourceCanvas = sourceTexture;
                var sourceCanvasContext = sourceCanvas.getContext('2d');
                var sourceCanvasImageData = sourceCanvasContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    
                var newCanvas = null, newCanvasContext = null, newImageData = null;
                for(var i = 0; i < this.included_channels.length; ++i) {
                    var colorMask = this.included_channels[i];
                    var colorTags = enumFlagsToString(ColorMaskFlag, colorMask)
                        .replaceAll('|', '');
                    if(newCanvas == null) {
                        newCanvas = canvas;
                    } else {
                        newCanvas = document.createElement('canvas') as HTMLCanvasElement;
                    }
                    newCanvas.id = `${this.id}_${colorTags}ChannelSampler`;
                    newCanvas.width = this.width;
                    newCanvas.height = this.height;
                    newCanvasContext = newCanvas.getContext('2d');
                    newImageData = newCanvasContext.getImageData(0, 0, newCanvas.width, newCanvas.height);
                    this.copyPixelsWithMask(sourceCanvasImageData, newImageData, colorMask);
                    newCanvasContext.putImageData(newImageData, 0, 0);
                    this.nodeGraph.registerEntity(newCanvas);
                }
            }   
        }
    }
}