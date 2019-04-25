import { NodeGraphRenderer, PrimitiveNodeConfig } from "../NodeGraph";
import React = require("react");
import { TextureNode, TextureNodeRenderer, TextureNodeRendererState, TextureNodeRendererProps, TextureNodeConfig } from "./TextureNode";
import Prando from "prando";
import { NodeGraphNamespace } from "../NodeGraphNamespace";
import { NodeGraphChannelDirection } from "../NodeGraphChannel";
import { RendererInterface } from "./PrimitiveNode";

export interface NoiseNodeRendererProps extends TextureNodeRendererProps {
    node: NoiseNode;
}

export interface NoiseNodeRendererState extends TextureNodeRendererState {
    seed: number;
}

export class NoiseNodeRenderer extends React.Component<NoiseNodeRendererProps, NoiseNodeRendererState> implements RendererInterface {
    private textureNodeRenderer: TextureNodeRenderer;

    constructor(props: NoiseNodeRendererProps) {
        super(props);
        this.state = {
            width: this.props.node.width,
            height: this.props.node.height,
            seed: this.props.node.seed
        }
    }

    updateState(node: NoiseNode) {
        var updatedValues = {
            width: node.width,
            height: node.height,
            seed: node.seed
        };

        node.generateNoiseData();
        this.setState(updatedValues);

        if(this.textureNodeRenderer != null) {
            this.textureNodeRenderer.updateState(node);
        }
    }

    regenerateNoise() {
        this.props.node.generateNoiseData();
        this.setState({ ...this.state, seed: this.state.seed + 1 });
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

export interface NoiseNodeConfig extends TextureNodeConfig {
    seed?: number;
}

export class NoiseNode extends TextureNode {
    noiseData: Float32Array;
    seed: number;
    constructor(config: NoiseNodeConfig) {
        super(config);
        this.nodeType = 'NoiseNode';
        this.seed = config.seed || 0;
        this.addChannel({
            name: 'noise_sampler',
            attributes: [
                {name: 'value', type: 'sampler2d', expression: `#${this.id}_NoiseSampler` }
            ],
            direction: NodeGraphChannelDirection.Outbound
        });
        this.generateNoiseData();
    }

    serialize() {
        return { ...super.serialize(), seed: this.seed };
    }

    generateNoiseData() {
        let rng = new Prando(this.seed);
        this.noiseData = new Float32Array(this.width * this.height);
        for(var i = 0; i < this.noiseData.length; ++i) {
            this.noiseData[i] = rng.next(0, 1);
        }
    }

    interface(nodeGraphRenderer: NodeGraphRenderer) {
        return <NoiseNodeRenderer
            ref={(ref) => nodeGraphRenderer.registerNodeReference(NodeGraphNamespace.getNodeNamespace(this), ref)}
            assetClicked={(id) => nodeGraphRenderer.onAssetClicked(id)}
            assetChanged={(namespace, state) => nodeGraphRenderer.onAssetChanged(namespace, state)}
            onTitleHover={(type, id, hovering) => nodeGraphRenderer.onEntityHover(type, id, hovering)}
            channelMouseDown={(id, x, y) => nodeGraphRenderer.onChannelDown(id, x, y)}
            channelMouseUp={(id, x, y) => nodeGraphRenderer.onChannelUp(id, x, y)}
            key={this.id}
            node={this}
        />
    }

    renderToCanvas(canvas: HTMLCanvasElement) {
        super.renderToCanvas(canvas);
        canvas.id = `${this.id}_NoiseSampler`;
        var canvasContext = canvas.getContext('2d');
        var imageData = canvasContext.getImageData(0, 0, this.width, this.height);
        for(var j = 0, i = 0; i < this.noiseData.length; j+=4, i++) {
            imageData.data[j] = (this.noiseData[i] * 255) | 0;
            imageData.data[j+1] = 128 + Math.cos(this.noiseData[i] * Math.PI) * 128;  
            imageData.data[j+2] = 128 + Math.sin(this.noiseData[i] * Math.PI) * 128;
            imageData.data[j+3] = ((Math.atan(this.noiseData[i] * Math.PI) / Math.PI * 2) * 255) | 0;
        }
        canvasContext.putImageData(imageData, 0, 0);
    }
}