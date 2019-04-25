import { PrimitiveNode } from "./Nodes/PrimitiveNode";
import { NoiseNode } from "./Nodes/NoiseNode";
import { TransformNode } from "./TransformNode";
import { TileNode } from "./Nodes/TileNode";
import { TextureNode } from "./Nodes/TextureNode";
import { ColorChannelNode } from "./Nodes/ColorChannelNode";
import { OutboundNode } from "./Nodes/OutboundNode";

export interface INodeLibraryMetadata {
    icon: string;
    description: string;
}

export interface INodeLibraryMetadataDictionary {
    [name: string]: INodeLibraryMetadata;
}

export const NodeLibraryMetadata: INodeLibraryMetadataDictionary = {
    "OutboundNode": {
        icon: 'CircleRing',
        description: ''
    },
    "ColorChannelNode": {
        icon: 'ColorSolid',
        description: ''
    },
    "TileNode": {
        icon: 'PictureTile',
        description: ''
    },
    "TransformNode": {
        icon: 'PanoIndicator',
        description: ''
    },
    "NoiseNode": {
        icon: 'Fingerprint',
        description: ''
    }
}

export {
    OutboundNode,
    ColorChannelNode,
    PrimitiveNode,
    TextureNode,
    TileNode,
    TransformNode,
    NoiseNode
};