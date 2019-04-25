import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/javascript/javascript.js';

const CodeMirrorComponent = {
    oncreate: function(vnode) {
        if(vnode.dom != null) {
            var codeMirror = CodeMirror.fromTextArea(vnode.dom, vnode.attrs );
            vnode.state.CodeMirror = codeMirror;
            vnode.state.CodeMirror.on('change', () => {
                if(vnode.attrs.onchange != null) {
                    vnode.attrs.onchange(vnode.state.CodeMirror.getValue())
                }
            });
        }
    },
    onbeforeremove: function(vnode) {
        $(vnode.state.CodeMirror.display.wrapper).remove();
        delete vnode.state.CodeMirror;
    },
    view: (vnode) => m('textarea', vnode.attrs.value)
}

export default CodeMirrorComponent;