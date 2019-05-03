import * as React from "react";
import * as uuidv4 from "uuid/v4";
import { IVector2, INodeGraphAsset, ISerializable } from "./NodeGraph";
import { RendererInterface } from "./Nodes/PrimitiveNode";
import { INodeGraphRendererInterface, NodeGraphRenderer } from "./NodeGraphRenderer";

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