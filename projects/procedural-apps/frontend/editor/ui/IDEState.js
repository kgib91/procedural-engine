import TreeViewState from "./TreeViewState"
import EditorContainerState from "./EditorContainerState"

class IDEState {
    constructor() {
        this.treeViewState = new TreeViewState();
        this.editorContainerState = new EditorContainerState();
    }
    clear() {
        this.treeViewState.clear();
        this.editorContainerState.clear();
    }
}

export default IDEState;