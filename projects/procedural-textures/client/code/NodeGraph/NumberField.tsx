import React = require("react");
import { TextField, ITextFieldProps, ITextField, TextFieldBase } from "office-ui-fabric-react/lib/TextField";

export interface NumberFieldProps extends ITextFieldProps {
}

export interface NumberFieldState {
    isMouseDown: boolean;
    isDragging: boolean;
    startCoord: number;
    value: string;
}

export class NumberField extends React.Component<NumberFieldProps, NumberFieldState> {
    private textFieldReference: ITextField;

    constructor(props: NumberFieldProps) {
        super(props);
        this.state = {
            isMouseDown: false,
            isDragging: false,
            startCoord: 0,
            value: this.props.value || '0'
        };
    }

    private mouseDownHandler(e: React.MouseEvent<HTMLInputElement|HTMLTextAreaElement>) {
        if(!this.state.isDragging) {
            this.setState({
                ...this.state,
                isMouseDown: true
            });
        }
    }

    private mouseMoveHandler(e: MouseEvent) {
        if(this.state.isMouseDown) {
            if(!this.state.isDragging) {
                this.setState({
                    ...this.state,
                    isDragging: true,
                    startCoord: e.screenX
                });
            }
            var delta = e.screenX - this.state.startCoord;
            var valuePreview = parseInt(this.props.value) + delta;
            this.setState({
                ...this.state,
                value: String(valuePreview)
            });
            event.stopPropagation();
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }
        return true;
    }

    private mouseUpHandler(e: MouseEvent) {
        if(this.state.isMouseDown) {
            var changes = { ...this.state, isMouseDown: false };
            if(this.state.isDragging) {
                changes = { ...changes, isDragging: false };
                var delta = e.screenX - this.state.startCoord;
                var valuePreview = parseInt(this.props.value) + delta;
                this.onValueChanged(null, String(valuePreview));
            }
            this.setState(changes);
            event.stopPropagation();
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }
        return true;
    }

    private _mouseMoveBinding = (e) => this.mouseMoveHandler(e);
    private _mouseUpBinding = (e) => this.mouseUpHandler(e);

    componentDidMount() {
        window.addEventListener('mousemove', this._mouseMoveBinding);
        window.addEventListener('mouseup', this._mouseUpBinding);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this._mouseMoveBinding);
        window.removeEventListener('mouseup', this._mouseUpBinding);
    }

    componentDidUpdate() {
        if(!this.state.isDragging) {
            if(this.props.value != this.state.value) {
                this.setState({ ...this.state, value: this.props.value || '0' });
            }
        }
    }

    private onValueChanged(e: any, newValue: string) {
        this.props.onChange(e, newValue);
        this.setState({...this.state, value: newValue});
    }

    render() {
        var element = <TextField
            {...this.props}
            componentRef={(ref) => this.textFieldReference = ref}
            value={this.state.value}
            onChange={(e, newValue) => { this.onValueChanged(e.nativeEvent, newValue); }}
            className={`numberField ${this.state.isDragging ? 'dragging' : ''}`}
            onMouseDown={(e) => this.mouseDownHandler(e)}
         />
        return element;
    }
}