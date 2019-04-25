import React = require("react");
import "./dockingcontainer.scss";

export enum DockingContainerAxis {
    Horizontal = 0,
    Vertical = 2
}

export interface DockingContainerProps {
    axis: DockingContainerAxis;
    primarySize?: number;
    secondarySize?: number;
    maxSize?: number;
    primary: React.ReactNode;
    secondary: React.ReactNode;
}

export interface DockingContainerState {
    width: number;
    height: number; 
}

export class DockingContainer extends React.Component<DockingContainerProps, DockingContainerState> {
    constructor(props: DockingContainerProps) {
        super(props);
    }

    render() {
        var primaryAxisStyle = null,
            secondaryAxisStyle = null;
        switch(this.props.axis) {
            case DockingContainerAxis.Horizontal:
            if(this.props.primarySize != null) {
                primaryAxisStyle = { bottom: `${100 - this.props.primarySize}%` };
                secondaryAxisStyle = { top: `${this.props.primarySize}%` };
            } else if(this.props.secondarySize != null) {
                primaryAxisStyle = { bottom: `${this.props.secondarySize}%` };
                secondaryAxisStyle = { top: `${100 - this.props.secondarySize}%` };
            }
                break;
            case DockingContainerAxis.Vertical:
                if(this.props.primarySize != null) {
                    primaryAxisStyle = { right: `${100 - this.props.primarySize}%` };
                    secondaryAxisStyle = { left: `${this.props.primarySize}%` };
                } else if(this.props.secondarySize != null) {
                    primaryAxisStyle = { right: `${this.props.secondarySize}%` };
                    secondaryAxisStyle = { left: `${100 - this.props.secondarySize}%` };
                }
                break;
        }
        return (
            <div className={`dockingContainer`}>
                <div className="primary" style={primaryAxisStyle}>
                    {this.props.primary}
                </div>
                <div className="secondary" style={secondaryAxisStyle}>
                    {this.props.secondary}
                </div>
            </div>
        )
    }
}