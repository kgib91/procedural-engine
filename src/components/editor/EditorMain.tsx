import * as React from "react";
import * as ReactCodeMirror from 'react-codemirror';
import SplitterLayout from 'react-splitter-layout';
import 'codemirror/mode/sass/sass';
 
import ModExpression from '../../mod/ModExpression'

import './EditorMain.scss';

import { ModRenderer } from "./ModRenderer"
import { StorageExplorer } from "./StorageExplorer";

export interface EditorMainProps { }
export interface EditorMainState {
}

export class EditorMain extends React.Component<EditorMainProps, EditorMainState> {
    private modRenderer: ModRenderer;
    private modExpression: ModExpression;
    private explorer: StorageExplorer;
    private codeMirror: ReactCodeMirror.ReactCodeMirror;
    private setCodeTimeoutId: any;

    setCode(name: string, code: string) {
        try {
            if(this.setCodeTimeoutId != null) {
                clearTimeout(this.setCodeTimeoutId);   
            }
            this.setCodeTimeoutId = setTimeout(() => {
                this.modExpression = ModExpression.fromString(code);
                console.debug('loaded modExpression:', this.modExpression);
                this.modRenderer.setModExpression(name, this.modExpression);
            }, 500);
        } catch (ex) {
            console.error(ex);
        }
    }

    updateCode(code: string) {
        var selectedItem = this.explorer.getSelectedItem();
        if(selectedItem != null) {
            localStorage.setItem(selectedItem, code);
            this.setCode(selectedItem, code);
        }
    }

    resize(w: number, h: number) {
        this.modRenderer.resize(w, h);
    }

    selectionChanged(name: string, code: string) {
        this.modRenderer.clearMod();
        var codeMirror = this.codeMirror.getCodeMirror() as any;
        this.codeMirror.getCodeMirror().setValue(code);
        this.setCode(name, code);
        codeMirror.clearHistory();
    }

    componentDidMount() {
        var selectedItem = this.explorer.getSelectedItem();
        if(selectedItem != null) {
            var code = localStorage.getItem(selectedItem);
            this.codeMirror.getCodeMirror().setValue(code);
            this.setCode(selectedItem, code);
        }
    }

    render() {
        return (
            <SplitterLayout onSecondaryPaneSizeChange={(w: number) => this.resize(w, null)}>
                <SplitterLayout vertical={true}>
                    <ReactCodeMirror
                        ref={(codeMirror) => this.codeMirror = codeMirror}
                        onChange={(code)=> this.updateCode(code)}
                        options={{
                            mode: 'sass',
                            lineNumbers: true
                        }}
                    />
                    <StorageExplorer ref={(explorer) => this.explorer = explorer} onSelectionChanged={(name, code) => this.selectionChanged(name, code)} />
                </SplitterLayout>
                <ModRenderer ref={(renderer) => this.modRenderer = renderer} />
            </SplitterLayout>   
        );
    }
}