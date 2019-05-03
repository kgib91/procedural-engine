import React = require("react");

export interface DockingWindowProps {
    title: string;
    controls?: { (ref: DockingWindow): React.ReactNode };
    onClose?: { (): void };
}

export interface DockingWindowState {
    isDeferredRender: boolean;
}

export class DockingWindow extends React.Component<DockingWindowProps, DockingWindowState> {
    constructor(props: DockingWindowProps) {
        super(props);
        this.state = {
            isDeferredRender: true
        };
    }

    componentDidMount() {
        if(this.props.controls != null) {
            setTimeout(() => {
                this.setState({ isDeferredRender: false });
            }, 10);
        }
    }

    updateControls() {
        this.setState({ isDeferredRender: false });
    }

    render() {
        return (
            <div className="dockingWindow">
                <div className="dockingMenu">
                    <span className="windowTitle">{this.props.title}</span>
                    {
                        this.state.isDeferredRender
                            ? null
                            : (
                                <div style={{display:'inline-block'}}>
                                    {this.props.controls(this)}
                                </div>
                            ) 
                    }
                </div>
                <div className="windowViewport">
                    {this.props.children}
                </div>
            </div>
        )
    }
}