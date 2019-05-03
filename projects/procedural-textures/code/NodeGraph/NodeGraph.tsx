import * as React from "react";
import * as uuidv4 from "uuid/v4";
import "./nodegraph.scss";
import "../StringExtensions";
import "../EnumExtensions";
import { ObjectInspectorRenderer, ObjectInspectorAssembly } from "../ObjectInspector/ObjectInspectorRenderer";
import { NodeGraphChannel } from "./NodeGraphChannel";
import { PrimitiveNode, RendererInterface } from "./Nodes/PrimitiveNode";
import { NodeGraphNamespace } from "./NodeGraphNamespace";
import { ColorMaskFlagAll } from "./Nodes/ColorChannelNode";
import { NodeGraphLink } from "./NodeGraphLinkRenderer";
import * as NodeLibrary from "./NodeLibrary";
import { NodeGraphGroup } from "./NodeGraphGroupRenderer";

export interface IVector2 {
    x: number;
    y: number;
}

export interface EntityHoverEventHandler {
    (type: string, id: string, hovering: boolean): void;
}

export interface NodeGraphAttribute extends INodeGraphAsset {
    object?: PrimitiveNode | NodeGraphChannel;
    type: string;
    expression?: string;
    read_only?: boolean;
}

export interface NodeGraphAttributes {
    [name: string]: NodeGraphAttribute;
}

export interface INodeState extends INodeGraphAsset {
    id: string;
    coordinate: IVector2;
    attributes: NodeGraphAttributes;
}

export interface PrimitiveNodeConfig {
    id?: string;
    channels?: NodeGraphChannel[];
    attributes?: NodeGraphAttribute[];
    coordinate?: IVector2;
    name: string;
    nodeGraph?: NodeGraph;
}


export interface INodeTask {
    getResult(): any;
}

export interface NodeGraphAssetEventHandler {
    (id: string): void;
}

export interface NodeGraphAssetChangedHandler {
    (namespace: string, state: INodeState): void;
}

export interface NodeGraphEntityRegistry {
    [id: string]: NodeGraphEntity;
}

export interface ISerializable {
    serialize(): any;
}

export interface INodeGraphAsset {
    name: string;
    typeName?: string;
}

export interface NodeGraphOptions {
    links?: NodeGraphLink[];
    nodes?: PrimitiveNode[];
    groups?: NodeGraphGroup[];
}

export interface NodeGraphEntity {
    id: string;
}

export class NodeGraph {
    readonly id: string;
    readonly links: NodeGraphLink[];
    readonly nodes: PrimitiveNode[];
    readonly entityRegistry: NodeGraphEntityRegistry;
    readonly groups: NodeGraphGroup[];

    constructor(options?: NodeGraphOptions) {
        options = options || {};

        this.id = uuidv4();

        this.links = [];
        this.nodes = [];
        this.groups = options.groups || [];
        this.entityRegistry = {};

        this.addLinks(options.links);
        this.addNodes(options.nodes);
    }

    removeLinkTo(targetExpression: string) {
        var removeIndex = null;
        for (var i = 0; i < this.links.length; ++i) {
            var link = this.links[i];
            if (link.targetExpression === targetExpression) {
                removeIndex = i;
                break;
            }
        }
        if (removeIndex != null) {
            this.links.splice(removeIndex, 1);
        }
    }

    addLinks(links: NodeGraphLink[]) {
        if (links == null) {
            throw 'Cannot add null to links';
        }
        for (var i = 0; i < links.length; ++i) {
            var link = links[i];
            if (link == null) {
                throw 'Cannot add null to links';
            }
            link.nodeGraph = this;
            this.links.push(link);
        }
    }

    addNodes(nodes: PrimitiveNode[]) {
        if (nodes == null) {
            throw 'Cannot add null to nodes';
        }
        for (var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            if (node == null) {
                throw 'Cannot add null to nodes';
            }
            node.nodeGraph = this;
            console.debug('addNode:', node);
            this.registerEntity(node);
            this.nodes.push(node);
        }
    }

    static serialize(graph: NodeGraph) {
        var storageObject: any = { links: [], nodes: [], groups: [] };
        for (var i = 0; i < graph.links.length; ++i) {
            storageObject.links.push(graph.links[i].serialize())
        }
        for (var i = 0; i < graph.nodes.length; ++i) {
            storageObject.nodes.push(graph.nodes[i].serialize())
        }
        for (var i = 0; i < graph.groups.length; ++i) {
            storageObject.groups.push(graph.groups[i].serialize())
        }
        return storageObject;
    }

    static deserialize(data: string): NodeGraph {
        var storageObject = JSON.parse(atob(data));
        var links = [];
        var nodes = [];
        var groups = [];
        if(storageObject.links != null) {
            for (var i = 0; i < storageObject.links.length; ++i) {
                links.push(new NodeGraphLink({
                    id: storageObject.links[i].id,
                    sourceExpression: storageObject.links[i].sourceExpression,
                    targetExpression: storageObject.links[i].targetExpression
                }));
            }
        }
        if(storageObject.nodes != null) {
            for (var i = 0; i < storageObject.nodes.length; ++i) {
                var nodeOptions = storageObject.nodes[i];
                nodes.push(new NodeLibrary[nodeOptions.nodeType](nodeOptions));
            }
        }
        if(storageObject.groups != null) {
            for (var i = 0; i < storageObject.groups.length; ++i) {
                var groupOptions = storageObject.groups[i];
                groups.push(new NodeGraphGroup(groupOptions));
            }
        }
        var nodeGraphOptions: NodeGraphOptions = {
            links,
            nodes,
            groups
        };
        return new NodeGraph(nodeGraphOptions);
    }

    private guidRegex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    removeLink(id: string) {
        if (id == null) {
            throw 'Cannot remove link with null id';
        }

        var index = -1;
        for (var i = 0; i < this.links.length; ++i) {
            var link = this.links[i];
            if (link.id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.links.splice(index, 1);
        }
    }

    removeNode(id: string) {
        if (id == null) {
            throw 'Cannot remove node with null id';
        }

        var targetChannels = [];
        var index = -1;
        for (var i = 0; i < this.nodes.length; ++i) {
            var node = this.nodes[i];
            if (node.id === id) {
                index = i;
                targetChannels = node.getInboundLinkPaths();
                break;
            }
        }

        while (targetChannels.length > 0) {
            var chan = targetChannels.pop();
            this.removeLinkTo(chan);
        }

        if (index >= 0) {
            this.nodes.splice(index, 1);
        }
    }

    registerEntity(entity: NodeGraphEntity) {
        if (this.entityRegistry.hasOwnProperty(entity.id)) {
            delete this.entityRegistry[entity.id];
        }
        this.entityRegistry[entity.id] = entity;
    }

    getNodeById(id: string): PrimitiveNode {
        console.debug('getNodeById:', this.entityRegistry);
        return this.entityRegistry[id] as PrimitiveNode;
    }

    getAssetByNamespace(namespace: string): INodeGraphAsset {
        var segments = namespace.split('/');
        var currentObject: any = null;
        console.debug('assetByNamespace:', namespace);
        while (segments.length > 0) {
            var segment = segments.shift();
            if (segment.trim() == '') {
                continue;
            } else if (segment == '~') {
                currentObject = null;
            } else if (this.guidRegex.test(segment)) {
                currentObject = this.getNodeById(segment);
            } else if (segment[0] == '@') {
                var attrName = segment.substr(1);
                if (currentObject == null || currentObject.attributes == null) { return null; }
                currentObject = currentObject.attributes[attrName];
            } else if (currentObject != null) {
                if (currentObject.hasOwnProperty(segment)) {
                    currentObject = currentObject[segment];
                }
            }
        }
        return currentObject;
    }

    getSourceOfTargetAttribute(attribute: NodeGraphAttribute): NodeGraphAttribute {
        var targetNamespace = NodeGraphNamespace.getAttributeNamespace(attribute);
        for (var i = 0; i < this.links.length; ++i) {
            if (this.links[i].targetExpression == targetNamespace) {
                var sourceAttribute = this.getAssetByNamespace(this.links[i].sourceExpression);
                return sourceAttribute as NodeGraphAttribute;
            }
        }
        return null;
    }
}

export const NodeGraphAssembly = new ObjectInspectorAssembly("NodeGraph", {
    "IVector2": {
        x: "number",
        y: "number"
    },
    "@enum;NodeGraphDataType:string": {
        string: "string",
        number: "number",
        boolean: "boolean",
        vec2: "vec2",
        sampler2d: "sampler2d"
    },
    "@flags;ColorMaskFlag:number": {
        R: "1",
        G: "2",
        B: "4",
        A: "8"
    },
    "NodeGraphExpression:string": {

    },
    "NodeGraphAttribute": {
        name: "@key;string",
        type: "NodeGraphDataType",
        expression: "nullable<string>",
        read_only: "boolean"
    },
    "PrimitiveNode": {
        name: "string",
        id: "readonly<string>",
        coordinate: "IVector2",
        attributes: "dictionary<NodeGraphAttribute>"
    },
    "NoiseNode:PrimitiveNode": {
        seed: "number"
    },
    "OutboundNode:PrimitiveNode": {
    },
    "ColorChannelNode:PrimitiveNode": {
        included_channels: "array<ColorMaskFlag>"
    },
    "NodeTransform": {
        scale: "IVector2",
        offset: "IVector2"
    },
    "TileProperties": {
        repeat: "IVector2"
    },
    "TransformNode:PrimitiveNode": {
        transform: "NodeTransform"
    },
    "TileNode:PrimitiveNode": {
        tile_properties: "TileProperties"
    }
}, (className) => {
    switch (className) {
        case 'ColorMaskFlag':
            return ColorMaskFlagAll;
        case 'NodeGraphAttribute':
            var newAttribute: NodeGraphAttribute = {
                name: 'newAttribute1',
                type: 'string',
                expression: null,
                read_only: false
            };
            return newAttribute;
    }
}, (
    inspector: ObjectInspectorRenderer,
    key: string,
    label: string,
    name: string,
    inspectorTypeName: string,
    disabled: boolean
) => {
        switch (inspectorTypeName) {
            case 'IVector2':
                return (
                    <ObjectInspectorRenderer
                        key={key}
                        path={key}
                        label={label}
                        onChange={inspector.props.onChange}
                        instance={inspector.props.instance}
                        propertyName={name}
                        target={inspector.getTarget()[name]}
                        type={inspectorTypeName}
                        assembly={inspector.props.assembly}
                    />
                );
        }
        return null;
    }
);

