import 'bootstrap/js/tab';
import marked from 'marked';
import CodeMirrorComponent from "../ui/CodeMirrorComponent"
import URI from 'urijs'

function url(url, search) {
    var uri = new URI(url.substr(2));
    for(var key in search) {
        uri.setQuery(key, search[key]);
    }
    return '#!'+uri;
}

const MarkdownEditor = {
    oninit: function(vnode) {
        vnode.state.content = vnode.attrs.value;
        var internal = vnode.attrs.onchange;
        vnode.attrs.onchange = (content) => {
            vnode.state.content = content;
            if(internal != null) {
                internal(content);
            }
        }
    },
    view: function(vnode) {
        var mdUrl = url(location.hash, {interface:'markdown'});
        var preUrl = url(location.hash, {interface:'preview'});

        var activeTab = m.route.param("interface") || 'markdown';

        return [
            m("div", { class: "tab-content" }, [
                m("div", { class: "tab-pane" + (activeTab == 'markdown' ? ' active' : ''), id: "markdown", role: "tabpanel" }, [
                    m(CodeMirrorComponent, vnode.attrs)
                ]),
                m("div", { class: "tab-pane" + (activeTab == 'preview' ? ' active' : ''), id: "preview", role: "tabpanel" }, [
                    m('p', {class:'jumbotron jumbotron-fluid'}, [
                        m.trust(marked(vnode.state.content))
                    ])
                ])
            ]),

            m('footer', [
                m('div', [
                    m("ul", { class: "nav nav-tabs nav-bottom" }, [
                        m("li", { class: "nav-item" + (activeTab == 'markdown' ? ' active' : '') }, [
                            m("a", {class: 'nav-link', href: mdUrl}, [m('i', {class:'icon icon-left fa fa-file-code-o'}), "Markdown"])
                        ]),
                        m("li", { class: "nav-item" + (activeTab == 'preview' ? ' active' : '') }, [
                            m("a", {class: 'nav-link', href: preUrl}, [m('i', {class:'icon icon-left fa fa-eye'}), "Preview"])
                        ])
                    ])
                ])
            ])
        ];
    }
}

export default MarkdownEditor;