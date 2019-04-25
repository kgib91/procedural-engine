import 'bootstrap/js/tab';
import Enumerable from 'linq';
import marked from 'marked';
import EditorComponent from './EditorComponent';
import DockerComponent from './DockerComponent';
import mime from 'mime-types'

const contentTypeIcons = {
    'application/json': 'js-icon yellow',
    'application/javascript': 'js-icon blue',
    'text/markdown': 'markdown-icon orange'
}

function posixPath(path) {
    return path.replace(/\\/g, '/')
}

const EditorContainerComponent = {
    oninit: (vnode) => {
        vnode.state = vnode.attrs.state;
    },
    onbeforeremove: (vnode) => {
        delete vnode.attrs.editors;
        delete vnode.attrs.activeKey;
    },
    view: (vnode) => {
        var tabs = [];
        
        var tabView = (key) => {
            var editor = vnode.state.editors[key]
            var contentTypeIcon = null;
            var parts = posixPath(editor.name).split('/');
            var fileName = parts[parts.length - 1];
            var contentType = mime.contentType(fileName);
            if(contentType != null) {
                contentType = contentType.split(';')[0];
                if(contentTypeIcons.hasOwnProperty(contentType)) {
                    contentTypeIcon = m('i', { class: 'icon-left '+contentTypeIcons[contentType]})
                }
            }
            var classes = key == vnode.state.activeKey ? 'active' : '';
            var url = ['#!/solution/', vnode.attrs.solution, '/ide?path='].join('');
            var draftTag = vnode.state.isDraft(editor.name) ? m('i', { class: 'icon icon-left fa fa-circle-o color orange'}) : null;
            var closeIcon = m('i', { onclick: (x) => { vnode.state.close(editor.name) }, class:'icon tab-activated-visibility fa fa-close'});
            return m('li', { class: ['nav-item',classes].join(' ') },
                    m('a', { href: [url, editor.name].join('') }, [draftTag, contentTypeIcon, fileName, closeIcon])
                );
        }
        for(var key in vnode.state.editors) {
            tabs.push(tabView(key))
        }
        
        var header = m('ul', { role: 'tablist', class: 'nav nav-tabs nav-top' }, tabs)
        var editor = vnode.state.activeKey != null
            ? m(EditorComponent, {
                data: vnode.state.editors[vnode.state.activeKey],
                state: vnode.state
            })
            : m.trust(marked(["# Error","__no active editors__"].join("\r")));
        return m('div', {class:'content vertical-top'}, [
            m('div', {class:'a'}, header),
            m('div', {class:'b editor'}, editor)
        ])
    }
}

export default EditorContainerComponent;