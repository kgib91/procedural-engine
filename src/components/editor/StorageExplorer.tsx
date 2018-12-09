import * as React from "react";
import * as CodeMirror from 'react-codemirror';
import SplitterLayout from 'react-splitter-layout';
import 'codemirror/mode/sass/sass';

import ModExpression from '../../mod/ModExpression'

import './EditorMain.scss';

import { ModRenderer } from "./ModRenderer"

export interface SelectionChangedHandler {
    (name: string, data: string)
}

export interface StorageExplorerProps {
    onSelectionChanged?: SelectionChangedHandler;
}
export interface StorageExplorerState {
    selectedIndex: number;
    renameTargetIndex: number;
    renameTarget: string;
}

const DEFAULT_MOD = `#box {
    instance: cube(1 1 1);
}`;

export class StorageExplorer extends React.Component<StorageExplorerProps, StorageExplorerState> {
    private storageItems: string[];
    
    componentWillMount() {
        this.storageItems = [];
        for(var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i);
            this.storageItems.push(key);
        }
        this.setState({
            selectedIndex: localStorage.length > 0 ? 0 : null,
            renameTarget: undefined,
            renameTargetIndex: null
        });
    }

    getSelectedItem() {
        return this.storageItems[this.state.selectedIndex];
    }

    componentDidMount() {
    }

    removeStorageItem(idx: number) {
        var name = this.storageItems[idx];
        if(confirm(`Do you really want to delete "${name}"`)) {
            localStorage.removeItem(name);
            if(this.storageItems.length > 1) {
                this.storageItems.splice(idx, 1);
                this.selectItem(this.state.selectedIndex-1);
            } else {
                this.storageItems = [];
            }
            this.forceUpdate();
        }
    }

    nameNewObject(inputName: string) {
        var iter = inputName;
        var i = 1;
        while(this.storageItems.indexOf(iter) >= 0) {
            iter = `${inputName}${i++}`
        }
        return iter;
    }

    createNew() {
        var newName = this.nameNewObject('#newobject');
        localStorage.setItem(newName, DEFAULT_MOD);
        if(this.storageItems.indexOf(newName) < 0) {
            this.storageItems.push(newName);
        }
        this.forceUpdate();
    }

    startRename(idx: number) {
        this.setState({ renameTarget: this.storageItems[idx], renameTargetIndex: idx });
    }

    completeRename(idx: number) {
        this.doRename(idx, this.storageItems[idx], this.state.renameTarget)
        this.setState({ renameTarget: undefined, renameTargetIndex: undefined });
    }

    selectItem(idx: number) {
        if(this.state.selectedIndex == idx) {
            return;
        }

        this.setState({selectedIndex: idx});
        if(idx != null) {
            this.props.onSelectionChanged(this.storageItems[idx], localStorage.getItem(this.storageItems[idx]));
        } else {
            this.props.onSelectionChanged(null, null);
        }
    }

    doRename(idx: number, from: string, to: string) {
        localStorage.setItem(to, localStorage.getItem(from));
        localStorage.removeItem(from);
        this.storageItems[idx] = to;
    }

    invalidateStorageName(idx: number, name: string) {
        this.setState({ renameTarget: name });
    }

    render() {
        var items = [];
        for(var i = 0; i < this.storageItems.length; ++i) {
            ((idx) => {
                var field = (<span>{this.storageItems[idx]}</span>);
                if(this.state.renameTargetIndex === idx) {
                    field = (<input type="text" value={this.state.renameTarget} onChange={(e)=>this.invalidateStorageName(idx, e.target.value)} onKeyUp={(e) => { if(e.keyCode == 13) { this.completeRename(idx)} }} />);
                }
                items.push(
                    <li key={idx} onDoubleClick={() => this.startRename(idx)} onClick={() => this.selectItem(idx)} className={this.state.selectedIndex == i ? 'selected' : null}>
                        {field} <button onClick={()=>this.removeStorageItem(idx)}>Remove</button>
                    </li>
                    );
            })(i);
        }
        return (
            <div>
                <div className="header">
                    <button onClick={() => this.createNew()}>New</button>
                </div>
                <ul className="storageList">
                    {items}
                </ul>
            </div>
        );
    }
}