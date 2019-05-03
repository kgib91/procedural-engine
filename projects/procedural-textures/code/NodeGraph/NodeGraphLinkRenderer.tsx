import { IVector2, NodeGraph, ISerializable, NodeGraphAttribute, EntityHoverEventHandler } from "./NodeGraph";
import React = require("react");
import * as uuidv4 from "uuid/v4";
import { RendererInterface } from "./Nodes/PrimitiveNode";
import { NodeGraphChannel } from "./NodeGraphChannel";
import { NodeGraphNamespace } from "./NodeGraphNamespace";
import { INodeGraphRendererInterface, NodeGraphRenderer } from "./NodeGraphRenderer";

export interface NodeGraphLinkRendererProps {
    id: string;
    nodeGraph?: NodeGraph;
    sourceChannel: string;
    targetChannel?: string;
    targetCoordinate?: IVector2;
    onLinkHover?: EntityHoverEventHandler;
}

export interface NodeGraphLinkRendererState {
    sourceCoordinate: IVector2;
    targetCoordinate: IVector2;
    hoveringLink: boolean;
}

export class NodeGraphLinkRenderer extends React.Component<NodeGraphLinkRendererProps, NodeGraphLinkRendererState> {
    private updateInterval: NodeJS.Timeout;

    constructor(props: NodeGraphLinkRendererProps) {
        super(props);
        this.state = {
            hoveringLink: false,
            sourceCoordinate: null,
            targetCoordinate: this.props.targetCoordinate || { x: 0, y: 0 }
        };
    }

    private deferredUpdate()
    {
        var linkDisplayElement = document.getElementById(`${this.props.nodeGraph.id}_LinksDisplay`);
        var sourceChannelElement = document.getElementById(this.props.sourceChannel);
        if(linkDisplayElement == null) {
            return null;
        }
        
        var viewportBounds = linkDisplayElement.getBoundingClientRect();
        var targetBounds = null;
        if(this.props.targetChannel != null) {
            var targetChannelElement = document.getElementById(this.props.targetChannel);
            targetBounds = targetChannelElement.getBoundingClientRect();
        } else if(this.props.targetCoordinate != null) {
            targetBounds = {
                left: viewportBounds.left + this.props.targetCoordinate.x,
                top: viewportBounds.top + this.props.targetCoordinate.y,
                right: viewportBounds.left + this.props.targetCoordinate.x + 10,
                bottom: viewportBounds.top + this.props.targetCoordinate.y + 10
            };
        }
        
        if(
            sourceChannelElement == null ||
            targetBounds == null
        ) {
            return <path id={`${this.props.id}_Path`} />;
        }
        var sourceBounds = sourceChannelElement.getBoundingClientRect();

        var sourceWidth = sourceBounds.right - sourceBounds.left;
        var sourceHeight = sourceBounds.bottom - sourceBounds.top;
        var targetWidth = targetBounds.right - targetBounds.left;
        var targetHeight = targetBounds.bottom - targetBounds.top;

        var sX = ((sourceBounds.left|0) + sourceWidth) - viewportBounds.left;
        var sY = ((sourceBounds.top|0) + sourceHeight * 0.5) - viewportBounds.top;
        var tX = ((targetBounds.left|0)) - viewportBounds.left;
        var tY = ((targetBounds.top|0) + targetHeight * 0.5) - viewportBounds.top;
        this.setState({
            ...this.state,
            sourceCoordinate: { x: sX, y: sY },
            targetCoordinate: { x: tX, y: tY }
        });
    }

    componentDidMount() {
        if(this.updateInterval != null) {
            clearInterval(this.updateInterval);
        }
        this.updateInterval = setInterval(() => this.deferredUpdate(), 10) as any as NodeJS.Timeout;
    }

    componentWillUnmount() {
        if(this.updateInterval != null) {
            clearInterval(this.updateInterval);
        }
    }

    onEnterLink(id: string) {
        if(
            !this.state.hoveringLink &&
            this.props.onLinkHover != null
        ) {
            this.props.onLinkHover('link', id, true);
            this.setState({
                hoveringLink: true
            })
        }
    }

    onLeaveLink(id: string) {
        if(
            this.state.hoveringLink &&
            this.props.onLinkHover != null
        ) {
            this.props.onLinkHover('link', id, false);
            this.setState({
                hoveringLink: false
            })
        }
    }

    render() {
        if(this.state.sourceCoordinate == null) {
            return <path 
                id={`${this.props.id}_Path`}
                className='nodeGraphLink'
            />;
        }
        var pathString = `M${this.state.sourceCoordinate.x},${this.state.sourceCoordinate.y} C${this.state.sourceCoordinate.x + 64},${this.state.sourceCoordinate.y} ${this.state.targetCoordinate.x - 64},${this.state.targetCoordinate.y} ${this.state.targetCoordinate.x},${this.state.targetCoordinate.y}`;
        return <path
            onMouseEnter={(e) => this.onEnterLink(this.props.id)}
            onMouseLeave={(e) => this.onLeaveLink(this.props.id)}
            id={`${this.props.id}_Path`}
            d={pathString}
            className={`nodeGraphLink ${this.props.targetCoordinate != null ? 'dashed' : null}`} />;
    }
}

export interface NodeGraphLinkOptions {
    id?: string;
    sourceExpression: string;
    targetExpression: string;
    nodeGraph?: NodeGraph;
}

export class NodeGraphLink implements ISerializable, INodeGraphRendererInterface, RendererInterface {
    id: string;
    sourceExpression: string;
    targetExpression: string;
    nodeGraph: NodeGraph;

    interface(nodeGraphRenderer: NodeGraphRenderer) {
        var sourceAttribute = this.nodeGraph.getAssetByNamespace(this.sourceExpression) as NodeGraphAttribute;
        var targetAttribute = this.nodeGraph.getAssetByNamespace(this.targetExpression) as NodeGraphAttribute;
        if (
            (sourceAttribute != null && sourceAttribute.object instanceof NodeGraphChannel) &&
            (targetAttribute != null && targetAttribute.object instanceof NodeGraphChannel)
        ) {
            var sourceAttributeChannelNamespace = NodeGraphNamespace.getChannelNamespace(sourceAttribute.object);
            var targetAttributeChannelNamespace = NodeGraphNamespace.getChannelNamespace(targetAttribute.object);

            return <NodeGraphLinkRenderer
                key={this.id}
                onLinkHover={(type, id, hovering) => nodeGraphRenderer.onEntityHover(type, id, hovering)}
                nodeGraph={this.nodeGraph}
                id={this.id}
                sourceChannel={sourceAttributeChannelNamespace}
                targetChannel={targetAttributeChannelNamespace}
            />;
        } 
        return null;
    }

    updateState(link: NodeGraphLink) {

    }

    serialize(): any {
        return {
            id: this.id,
            sourceExpression: this.sourceExpression,
            targetExpression: this.targetExpression
        };
    }

    constructor(options: NodeGraphLinkOptions) {
        if(
            options == null ||
            options.sourceExpression == null ||
            options.targetExpression == null
        ) {
            throw new ReferenceError("sourceExpression and targetExpression are required options") 
        }
        
        this.id = options.id || uuidv4();
        this.nodeGraph = options.nodeGraph;
        this.sourceExpression = options.sourceExpression;
        this.targetExpression = options.targetExpression;
    }
}