import React = require("react");

export interface ExpansionPanelProps {
    title: string;
    expanded: boolean;
    onChange: { (): void };
}

export interface ExpansionPanelState {
    expanded: boolean;
}

export class ExpansionPanel extends React.Component<ExpansionPanelProps, ExpansionPanelState> {

    constructor(props: ExpansionPanelProps) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    render() {
        return <div className="expansionPanel">
            <div className="title">{this.props.title}</div>
            <div>{this.props.children}</div>
        </div>
    }
}