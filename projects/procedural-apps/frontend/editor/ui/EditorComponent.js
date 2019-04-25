import MarkdownEditor from "../interfaces/MarkdownEditor"
import WorkflowEditor from "../interfaces/WorkflowEditor"
import CodeMirrorComponent from "../ui/CodeMirrorComponent"

const EditorComponent = {
    view: (vnode) => {
        var data = vnode.attrs.data;
        var editorContainerState = vnode.attrs.state;

        if(data == null) {
            throw Error("Bad data passed into editor.")
        }

        var buffer = Buffer.from(data.body, 'base64').toString('utf8');

        var onChange = (content) => {
            var value = content;
            if(typeof(content) != "string") {
                value = JSON.stringify(content, null, 2);
                if(vnode.attrs.changed != null) {
                    vnode.attrs.changed(content);
                }
            } else {
                if(vnode.attrs.changed != null) {
                    vnode.attrs.changed(JSON.parse(content));
                }
            }
            vnode.attrs.data.body = Buffer.from(value, 'utf8').toString('base64');
            editorContainerState.draft(data);
        };

        if(data.name.indexOf('.md') > 0) {
            var markdownEditorOptions = {
                value: buffer,
                onchange: onChange,
                lineNumbers: true,
                theme: 'material',
                mode: 'markdown'
            };
            return m(MarkdownEditor, markdownEditorOptions);
        } else if(data.name.indexOf('.json') > 0) {
             var jsonEditorOptions = {
                value: buffer,
                onchange: onChange,
                theme: 'material',
                mode: 'javascript'
            };
            return m(WorkflowEditor, jsonEditorOptions);
        }
        
        var javascriptEditorOptions = {
            value: buffer,
            onchange: onChange,
            lineNumbers: true,
            theme: 'material',
            mode: 'javascript'
        };
        return m(CodeMirrorComponent, javascriptEditorOptions);
    }
}

export default EditorComponent;