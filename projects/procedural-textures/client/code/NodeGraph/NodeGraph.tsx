import * as React from "react";
import * as uuidv4 from "uuid/v4";
import * as Enumerable from "linq";
import "./nodegraph.scss";
import "../StringExtensions";
import "../EnumExtensions";
import { ObjectInspectorRenderer, ObjectInspectorAssembly } from "../ObjectInspector/ObjectInspectorRenderer";
import { NodeGraphChannel, NodeGraphChannelDirection } from "./NodeGraphChannel";
import { PrimitiveNode, RendererInterface } from "./Nodes/PrimitiveNode";
import { NodeGraphNamespace } from "./NodeGraphNamespace";
import { ColorMaskFlagAll } from "./Nodes/ColorChannelNode";
import { NodeGraphLink, NodeGraphLinkRenderer } from "./NodeGraphLinkRenderer";
import * as NodeLibrary from "./NodeLibrary";
import { DockingContainer, DockingContainerAxis } from "../DockingContainer/DockingContainer";
import { ImageViewport } from "../ImageViewport/ImageViewport";
import { NodeGraphExpression } from "./NodeGraphExpression";
import { DockingWindow } from "../DockingContainer/DockingWindow";
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { IContextualMenuListProps, IContextualMenuItem, ContextualMenu, IContextualMenu, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ComboBox, IComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/ComboBox';
import { GroupedList, IGroup } from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/utilities/selection/index';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { List } from 'office-ui-fabric-react/lib/List';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { NumberField } from "./NumberField";
import { StandardPreview, StandardPreviewProps } from "../StandardPreview/StandardPreview";
import { OutboundNode, OutboundNodeConfig } from "./Nodes/OutboundNode";
import { NodeLibraryMetadata } from "./NodeLibrary";
import { IColorClassNames } from "@uifabric/styling/lib/classNames/ColorClassNames";

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

export interface INodeGraphRendererInterface {
    interface(nodeGraphRenderer: NodeGraphRenderer): React.ReactNode;
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
}

export interface NodeGraphRendererProps {
    nodeGraph: NodeGraph;
}

export interface NodeGraphGroupOptions {
    name: string;
    id?: string;
    color?: number;
    coordinate?: IVector2;
    width?: number;
    height?: number;
}


export interface NodeGraphGroupRendererProps {
    group: NodeGraphGroup;
}

export interface NodeGraphGroupRendererState {
    name: string;
    color: number;
    coordinate: IVector2;
    width: number;
    height: number;
}

export class NodeGraphGroupRenderer extends React.Component<NodeGraphGroupRendererProps, NodeGraphGroupRendererState> implements RendererInterface {
    constructor(props: NodeGraphGroupRendererProps) {
        super(props);
        this.state = {
            name: this.props.group.name,
            color: this.props.group.color,
            coordinate: this.props.group.coordinate,
            width: this.props.group.width,
            height: this.props.group.height
        };
    }

    updateState(group: NodeGraphGroup) {
        var updatedValues = {
            name: group.name,
            coordinate: group.coordinate,
            width: group.width,
            height: group.height
        };
        this.setState(updatedValues);
    }

    render() {
        return <div
                    key={this.props.group.id}
                    className="nodeGraphGroup"
                    style={{
                        left: this.state.coordinate.x,
                        top: this.state.coordinate.y,
                        width: this.state.width,
                        height: this.state.height
                    }}
                >
                {this.props.group.name || this.props.group.id}
                </div>;
    }
}

export class NodeGraphGroup implements ISerializable, INodeGraphRendererInterface, INodeGraphAsset {
    name: string;
    color: number;
    id: string;
    coordinate: IVector2;
    width: number;
    height: number;

    constructor(options: NodeGraphGroupOptions) {
        this.name = options.name;
        this.id = options.id || uuidv4();
        this.color = options.color || 0;
        this.coordinate = options.coordinate || { x: 0, y: 0 };
        this.width = options.width || 128;
        this.height = options.height || 128;
    }

    interface(renderer: NodeGraphRenderer) {
        return (
            <NodeGraphGroupRenderer
                key={this.id}
                group={this}
            />
        );
    }

    serialize(): any {
        return {
            name: this.name,
            id: this.id,
            coordinate: this.coordinate,
            width: this.width,
            height: this.height
        };
    }
}


export interface NodeGraphRendererState {
    selectedAsset: string;
    opacity: number;
    isDraggingLink: boolean;
    draggingSourceChannelNamespace: string;
    draggingCoordinate: IVector2;
    contextMenuHidden: boolean;
    contextMenuMeta: string;
    hoveringEntity: string;
    contextMenuTarget: MouseEvent;
    standardPreviewProps: StandardPreviewProps;
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
        return this.entityRegistry[id] as PrimitiveNode;
    }

    getAssetByNamespace(namespace: string): INodeGraphAsset {
        var segments = namespace.split('/');
        var currentObject: any = null;

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

export class NodeGraphRenderer extends React.Component<NodeGraphRendererProps, NodeGraphRendererState> {
    private nodeAssetReferences: { [namespace: string]: RendererInterface };
    private channelPreviewImageViewer: ImageViewport;

    constructor(props: NodeGraphRendererProps) {
        super(props);
        this.state = {
            selectedAsset: null,
            opacity: 128,
            isDraggingLink: false,
            standardPreviewProps: { color: undefined, displacement: undefined },
            draggingSourceChannelNamespace: null,
            draggingCoordinate: { x: 0, y: 0 },
            contextMenuMeta: null,
            contextMenuHidden: true,
            contextMenuTarget: null,
            hoveringEntity: null
        };
        this.nodeAssetReferences = {};
    }

    registerNodeReference(namespace: string, nodeRenderer: any) {
        this.nodeAssetReferences[namespace] = nodeRenderer;
    }

    unregisterNodeReference(namespace: string) {
        delete this.nodeAssetReferences[namespace];
    }

    renderNodeGraphGroups(): React.ReactNode {
        return Enumerable.from(this.props.nodeGraph.groups)
            .select(x => x.interface(this))
            .toArray();
    }

    renderNodeGraphNodes(): React.ReactNode {
        return Enumerable.from(this.props.nodeGraph.nodes)
            .select(x => x.interface(this))
            .toArray();
    }

    onAssetClicked(namespace: string) {
        this.setState({
            ...this.state,
            selectedAsset: namespace
        });
    }

    renderNodeGraphLinks(): React.ReactNode {
        return Enumerable.from(this.props.nodeGraph.links)
            .select(x => x.interface(this))
            .where(x => x != null)
            .toArray();
    }

    onEntityHover(type, id, hovering) {
        if (hovering) {
            this.setState({
                ...this.state,
                hoveringEntity: `${type}:${id}`
            });
        }
        if (!hovering && this.state.hoveringEntity != null) {
            this.setState({
                ...this.state,
                hoveringEntity: null
            });
        }
    }

    private _documentOnMouseMove = (e) => this.onDragChannel(e, e.clientX, e.clientY);
    private _documentOnMouseUp = (e) => this.cancelDragChannel(e);

    componentDidMount() {
        document.addEventListener('mousemove', this._documentOnMouseMove);
        document.addEventListener('mouseup', this._documentOnMouseUp);

        // everything loaded
        this.updateStandardPreview();
    }

    updateStandardPreview() {
        var outboundNode = Enumerable.from(this.props.nodeGraph.nodes)
            .where(x => x instanceof OutboundNode)
            .firstOrDefault();

        if (outboundNode != null) {
            var colorTexture = null;
            var displacementTexture = null;

            var links = outboundNode.getInboundLinkPaths();
            var linkAssets = Enumerable.from(links)
                .toDictionary(
                    x => ((this.props.nodeGraph.getAssetByNamespace(x) as NodeGraphAttribute).object as NodeGraphChannel).name,
                    x => NodeGraphExpression.evaluate(this.props.nodeGraph, x)
                );
            colorTexture = linkAssets.get('color');
            displacementTexture = linkAssets.get('displacement');
            this.setState({
                ...this.state,
                standardPreviewProps: {
                    color: colorTexture,
                    displacement: displacementTexture
                }
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this._documentOnMouseMove);
        document.removeEventListener('mouseup', this._documentOnMouseUp);
    }

    cancelDragChannel(e: MouseEvent) {
        if (this.state.isDraggingLink) {
            this.setState({
                ...this.state,
                isDraggingLink: false
            });
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }

    onDragChannel(e: MouseEvent, x, y) {
        if (this.state.isDraggingLink) {
            var linkDisplayElement = document.getElementById(`${this.props.nodeGraph.id}_LinksDisplay`);
            if (linkDisplayElement != null) {
                var bounds = linkDisplayElement.getBoundingClientRect();
                this.setState({
                    ...this.state,
                    draggingCoordinate: { x: x - bounds.left, y: y - bounds.top }
                })
            }
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        }
        return true;
    }

    onChannelDown(namespace: string, x: number, y: number) {
        if (!this.state.isDraggingLink) {
            var linkDisplayElement = document.getElementById(`${this.props.nodeGraph.id}_LinksDisplay`);
            if (linkDisplayElement != null) {
                var bounds = linkDisplayElement.getBoundingClientRect();
                this.setState({
                    ...this.state,
                    isDraggingLink: true,
                    draggingSourceChannelNamespace: namespace,
                    draggingCoordinate: { x: x - bounds.left, y: y - bounds.top }
                });
            }
        }
    }

    onChannelUp(namespace: string, x: number, y: number) {
        if (this.state.isDraggingLink) {
            var linkDisplayElement = document.getElementById(`${this.props.nodeGraph.id}_LinksDisplay`);
            if (linkDisplayElement != null) {
                var bounds = linkDisplayElement.getBoundingClientRect();
                this.setState({
                    ...this.state,
                    isDraggingLink: false,
                    draggingCoordinate: { x: x - bounds.left, y: y - bounds.top }
                });
                var linkFromExpression = `${this.state.draggingSourceChannelNamespace}/@value`;
                var linkToExpression = `${namespace}/@value`;

                var fromAsset = this.props.nodeGraph.getAssetByNamespace(this.state.draggingSourceChannelNamespace);
                var toAsset = this.props.nodeGraph.getAssetByNamespace(namespace);

                if (
                    toAsset instanceof NodeGraphChannel &&
                    fromAsset instanceof NodeGraphChannel &&
                    linkToExpression != linkFromExpression &&
                    toAsset.direction != fromAsset.direction
                ) {
                    var a = null, b = null;
                    if (toAsset.direction == NodeGraphChannelDirection.Outbound) {
                        a = linkToExpression;
                        b = linkFromExpression;
                    } else {
                        a = linkFromExpression;
                        b = linkToExpression;
                    }

                    this.props.nodeGraph.removeLinkTo(b);
                    this.props.nodeGraph.addLinks([
                        new NodeGraphLink({
                            sourceExpression: a,
                            targetExpression: b
                        })
                    ]);
                    this.saveNodeGraph();
                }
            }
        }
    }

    saveNodeGraph(name: string = null) {
        name = name || 'savedNodeGraph';

        var savedOptions = NodeGraph.serialize(this.props.nodeGraph);
        if (savedOptions != null) {
            localStorage.setItem(name, btoa(JSON.stringify(savedOptions)));
        }

        this.updateStandardPreview();
    }

    onAssetChanged(namespace: string, nodeState: INodeState) {
        var nodeRendererReference = this.nodeAssetReferences[namespace];
        nodeRendererReference.updateState(nodeState);
        this.setState({ ...this.state });
        this.saveNodeGraph();
    }

    clearSelection() {
        this.setState({
            ...this.state,
            selectedAsset: null
        });
    }

    renderAssetInspector() {
        if (this.state.selectedAsset != null) {
            var asset = this.props.nodeGraph.getAssetByNamespace(this.state.selectedAsset);
            var assetEditor = null;
            var previewAssets = [];
            var previewOptions = [];
            if (asset instanceof PrimitiveNode) {
                for (var channelName in asset.outputs) {
                    var channel = asset.outputs[channelName];
                    for (var attributeName in channel.attributes) {
                        var attribute = channel.attributes[attributeName];
                        if (attribute.type === 'sampler2d') {
                            previewOptions.push(`${channelName}_${attribute.name}`);
                            previewAssets.push(attribute.expression);
                        }
                    }
                }

                assetEditor = <ObjectInspectorRenderer
                    instance={asset}
                    onChange={() => this.onAssetChanged(this.state.selectedAsset, asset as INodeState)}
                    type={asset.constructor.name}
                    assembly={NodeGraphAssembly}
                />;
            } else {
                assetEditor = <span>{asset.name}</span>;
            }

            var inspectorElement = (
                <DockingWindow
                    title="Inspector"
                    onClose={() => this.clearSelection()}
                >
                    {assetEditor}
                </DockingWindow>
            );
            if (previewAssets.length == 0) {
                return inspectorElement;
            }

            return <DockingContainer
                primarySize={25}
                axis={DockingContainerAxis.Vertical}
                primary={(
                    <DockingWindow
                        title="Channel Preview"
                        controls={(dockingWindow) => (
                            <OverflowSet
                                onRenderItem={(item) => item.onRender(item)}
                                onRenderOverflowButton={(overflowItems: any[] | undefined) => <DefaultButton menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems! }} />}
                                items={[]}
                                overflowItems={[
                                    {
                                        key: 'Opacity',
                                        onRender: (item: any) => (
                                            <Slider
                                                min={0}
                                                value={this.channelPreviewImageViewer.state.opacity}
                                                max={255}
                                                onChanged={(x, value) => {
                                                    this.channelPreviewImageViewer.setOpacity(value);
                                                    dockingWindow.updateControls();
                                                }}
                                            />
                                        )
                                    },
                                    {
                                        key: 'Channel Sampler',
                                        onRender: (item: any) => (
                                            <TooltipHost
                                                content={previewOptions[0]}
                                                id="myID"
                                                calloutProps={{ gapSpace: 0 }}
                                            >
                                                <ComboBox
                                                    defaultSelectedKey={previewOptions[0]}
                                                    allowFreeform
                                                    aria-describedby="myID"
                                                    autoComplete="on"
                                                    onChange={(x, value) => console.log('changed:', value)}
                                                    options={previewOptions.map((x) => { return { key: x, text: x }; }) as IComboBoxOption[]}
                                                />
                                            </TooltipHost>
                                        )
                                    }
                                ]}
                            />
                        )}
                        onClose={() => this.clearSelection()}
                    >
                        <ImageViewport
                            ref={(ref) => this.channelPreviewImageViewer = ref}
                            image={NodeGraphExpression.evaluate(this.props.nodeGraph, previewAssets[0]) as HTMLCanvasElement}
                        />
                    </DockingWindow>
                )}
                secondary={inspectorElement}
            />;
        }
        return null;
    }

    private createNodeManagerItems() {
        var items = [];
        for(var i = 0; i < this.props.nodeGraph.nodes.length; ++i) {
            var node = this.props.nodeGraph.nodes[i];
            if(!NodeLibraryMetadata.hasOwnProperty(node.nodeType)) {
                continue;
            }
            items.push({
                name: node.name,
                url: '#',
                icon: NodeLibraryMetadata[node.nodeType].icon,
                key: `Explorer_${node.id}`
            });
        }
        //FabricFolder
        return [
            {
                links: items
            }
        ];
    }

    renderNodeManager() {
        var listItems = [];
        for (var i = 0; i < this.props.nodeGraph.nodes.length; ++i) {
            ((index) => {
                var node = this.props.nodeGraph.nodes[index];
                listItems.push({
                    id: node.id,
                    name: node.name
                });
            })(i);
        }

        return (
            <FocusZone>
                <Nav
                    groups={this.createNodeManagerItems()}
                />
            </FocusZone>
        );
    }

    closeContextMenu() {
        if (!this.state.contextMenuHidden) {
            this.setState({
                contextMenuHidden: true
            });
        }
    }

    removeLink(id: string) {
        this.props.nodeGraph.removeLink(id);
        this.saveNodeGraph();
    }

    removeNode(id: string) {
        this.props.nodeGraph.removeNode(id);
        this.saveNodeGraph();
    }

    private withUniqueName(name: string, names: string[]): string {
        var nameTag = name;
        var iteration = 0;
        while (
            names.indexOf(name) >= 0 &&
            iteration++ < 1024
        ) {
            name = `${nameTag}${iteration}`;
        }
        return name;
    }

    private getDraggingCoordinate() {
        return this.state.draggingCoordinate;
    }

    renderNodeGraph() {
        var contextMenuItems = [];
        if (this.state.contextMenuMeta != null) {
            var [type, options] = this.state.contextMenuMeta.split(':');
            switch (type) {
                case 'link':
                    var [id] = options.split(';');
                    contextMenuItems = [
                        {
                            key: 'Remove Link',
                            text: 'Remove Link',
                            onClick: () => { this.removeLink(id); this.closeContextMenu(); }
                        }
                    ];
                    break;
                case 'node':
                    var [id] = options.split(';');
                    contextMenuItems = [
                        {
                            key: 'Remove Node',
                            text: 'Remove Node',
                            onClick: () => { this.removeNode(id); this.closeContextMenu(); }
                        }
                    ];
                    break;
                case 'none':
                    contextMenuItems = [];
                    
                    for (var key in NodeLibrary) {
                        ((nodeType) => {
                            if(NodeLibraryMetadata[nodeType] == null) {
                                return;
                            }
                            contextMenuItems.push({
                                key: nodeType,
                                iconProps: {
                                  iconName: NodeLibraryMetadata[nodeType].icon
                                },
                                text: `${nodeType}`,
                                onClick: () => {
                                    var existingNodeNames = Enumerable.from(this.props.nodeGraph.nodes)
                                        .select(x => x.name)
                                        .toArray();
                                    var outboundNodeOptions = {
                                        name: this.withUniqueName(nodeType.toLowerCase().replace('node', ''), existingNodeNames),
                                        coordinate: this.getDraggingCoordinate()
                                    };
                                    this.props.nodeGraph.addNodes([
                                        new NodeLibrary[nodeType](outboundNodeOptions)
                                    ]);
                                    this.saveNodeGraph();
                                    this.closeContextMenu();
                                }
                            });
                        })(key);
                    }
                    break;
            }
        }

        return (
            <div
                className="nodeGraph"
                onClick={(e) => {
                    if (!this.state.contextMenuHidden) {
                        this.setState({
                            ...this.state,
                            contextMenuHidden: true,
                            contextMenuMeta: null,
                            contextMenuTarget: e.nativeEvent
                        });
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    return true;
                }}
                onContextMenu={(e) => {
                    if (
                        e.button == 2 &&
                        !e.ctrlKey &&
                        this.state.contextMenuHidden
                    ) {
                        var linkDisplayElement = document.getElementById(`${this.props.nodeGraph.id}_LinksDisplay`);
                        if (linkDisplayElement != null) {
                            var bounds = linkDisplayElement.getBoundingClientRect();
                            this.setState({
                                ...this.state,
                                draggingCoordinate: { x: e.clientX - bounds.left, y: e.clientY - bounds.top },
                                contextMenuHidden: false,
                                contextMenuMeta: this.state.hoveringEntity || 'none',
                                contextMenuTarget: e.nativeEvent
                            });
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                    if (e.button == 2 && e.ctrlKey) {
                        return false;
                    }
                    return true;
                }}
            >
                <svg id={`${this.props.nodeGraph.id}_LinksDisplay`} className="linksDisplay">
                    {this.renderNodeGraphLinks()}
                    {
                        this.state.isDraggingLink ? (
                            <NodeGraphLinkRenderer
                                key={"draggingLinkNode"}
                                nodeGraph={this.props.nodeGraph}
                                id={"draggingLinkNode"}
                                sourceChannel={this.state.draggingSourceChannelNamespace}
                                targetCoordinate={this.state.draggingCoordinate}
                            />
                        )
                            : null
                    }
                </svg>
                {this.renderNodeGraphGroups()}
                {this.renderNodeGraphNodes()}
                <ContextualMenu
                    hidden={this.state.contextMenuHidden}
                    target={this.state.contextMenuTarget}
                    items={[
                        {
                            key: 'placeSection',
                            itemType: ContextualMenuItemType.Section,
                            sectionProps: {
                                topDivider: false,
                                bottomDivider: false,
                                title: 'Place',
                                items: contextMenuItems
                            }
                        },
                        {
                            key: 'utilitySection',
                            itemType: ContextualMenuItemType.Section,
                            sectionProps: {
                                topDivider: false,
                                bottomDivider: false,
                                title: 'Utility',
                                items: [
                                    {
                                        key: 'createGroup',
                                        text: 'Group',
                                        onClick: () => {
                                            this.createGroup([{
                                                name: '',
                                                coordinate: this.getDraggingCoordinate()
                                            }]);
                                            this.closeContextMenu();
                                        },
                                        iconProps: {
                                            iconName: 'FabricFolder'
                                        }
                                    }
                                ]
                            }
                        }
                    ]}
                />
            </div>
        );
    }

    createGroup(newOptions: NodeGraphGroupOptions[]) {
        for(var i = 0; i < newOptions.length; ++i) {
            var options = newOptions[i];
            this.props.nodeGraph.groups.push(new NodeGraphGroup(options));
        }
    }

    render() {
        if (
            this.props.nodeGraph.nodes == null ||
            this.props.nodeGraph.nodes.length === 0
        ) {
            return null;
        }

        return (
            <DockingContainer
                axis={DockingContainerAxis.Vertical}
                primarySize={20}
                primary={
                    <DockingContainer
                        secondarySize={40}
                        axis={DockingContainerAxis.Horizontal}
                        primary={(
                            <DockingWindow
                                title="Explorer"
                            >
                                {this.renderNodeManager()}
                            </DockingWindow>
                        )}
                        secondary={(
                            <DockingWindow
                                title="Standard Preview"
                            >
                                <StandardPreview {...this.state.standardPreviewProps} />
                            </DockingWindow>
                        )}
                    />
                }
                secondary={
                    (this.state.selectedAsset == null)
                        ? this.renderNodeGraph()
                        : (
                            <DockingContainer
                                axis={DockingContainerAxis.Horizontal}
                                secondarySize={40}
                                primary={this.renderNodeGraph()}
                                secondary={this.renderAssetInspector()}
                            />
                        )
                }
            />
        );
    }
}