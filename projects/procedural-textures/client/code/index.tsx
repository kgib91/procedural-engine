import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.scss";
import { NodeGraph, NodeGraphRenderer } from "./NodeGraph/NodeGraph";
import { NoiseNode } from "./NodeGraph/Nodes/NoiseNode";
import { ColorChannelNode } from "./NodeGraph/Nodes/ColorChannelNode";
import { TransformNode } from "./NodeGraph/TransformNode";
import { TileNode } from "./NodeGraph/Nodes/TileNode";
import { PrimitiveNode } from "./NodeGraph/Nodes/PrimitiveNode";
import { NodeGraphLink } from "./NodeGraph/NodeGraphLinkRenderer";

var nodeGraph = null;
var storedNodeGraph = localStorage.getItem('savedNodeGraph');
if(storedNodeGraph != null) {
    nodeGraph = NodeGraph.deserialize(storedNodeGraph);
} else {
    var noiseNode = new NoiseNode({ name: "noise", coordinate: { x: 200, y: 100 }, width: 128, height: 128 });
    var colorChannelNode = new ColorChannelNode({ name: "color_channel", coordinate: { x: 400, y: 150 }, width: 128, height: 128 });
    var transformNode = new TransformNode({ name: "transform", coordinate: { x: 600, y: 250 }, width: 128, height: 128 });
    var tileNode = new TileNode({ name: "tile", coordinate: { x: 800, y: 128 }, width: 128, height: 128 });
    nodeGraph = new NodeGraph({
        links: [
            new NodeGraphLink({
                sourceExpression: `~/${noiseNode.id}/outputs/noise_sampler/@value`,
                targetExpression: `~/${colorChannelNode.id}/inputs/input_sampler/@value`
            }),
            new NodeGraphLink({
                sourceExpression: `~/${colorChannelNode.id}/outputs/rgba_channel_sampler/@value`,
                targetExpression: `~/${transformNode.id}/inputs/input_sampler/@value`
            }),
            new NodeGraphLink({
                sourceExpression: `~/${transformNode.id}/outputs/transformed_sampler/@value`,
                targetExpression: `~/${tileNode.id}/inputs/input_sampler/@value`
            })
        ],
        nodes: [
            noiseNode,
            colorChannelNode,
            transformNode,
            tileNode
        ]
    });
}


ReactDOM.render(
    <NodeGraphRenderer nodeGraph={nodeGraph} />,
    document.getElementById("root")
);