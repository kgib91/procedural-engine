import './style.less'
import Enumerable from 'linq';
import IDEState from './editor/ui/IDEState'
import TreeViewComponent from './editor/ui/TreeViewComponent'
import EditorContainerComponent from './editor/ui/EditorContainerComponent'
import DockerComponent from './editor/ui/DockerComponent'
import mime from 'mime-types'

const SolutionItemView = function(model) {
    var elements = [
        m("div", { class: 'd-flex w-100 justify-content-between' }, [
            m("h3", { class: "mb-1" }, model.name), m("small", { class: "text-muted" }, model.version)
        ]),
        m("p", { class: "mb-1" }, model.description),
        m("small", { class: "text-muted" }, model.provider)
    ];
    return [
        m("a", { class: 'list-group-item list-group-item-action flex-column align-items-start', href: "#!/solution/"+model.name+"/ide" }, elements)
    ];
}

const Solutions = {
    view: function() {
        var list = [];
        $.ajax({
            url: "//localhost/solutions",
            dataType: 'json',
            async: false,
            success: function(data) {
                for(var idx in data) {
                    list.push(SolutionItemView(data[idx]));
                }
            }
        });
        return m("main", [
            m("div", { class: 'col col-6 list-group' }, list)
        ]);
    }
};

const contentTypeIcons = {
    'application/json': 'js-icon yellow',
    'application/javascript': 'js-icon blue',
    'text/markdown': 'markdown-icon orange'
}

const IDENavigationPropertyItemView = (state, path, alias, x) => {
    var active = state.encodeKey(path) == state.encodeKey(x.fullPath);
    var isLeaf = !(x.data != null && x.data.isContainer);
    var classes = ['list-group-item', active ? 'active' : ''].join(' ');
    var href = ["#!","solution",alias,"ide"].join('/')+("?path=" + x.fullPath);
    //url("#!","solution",alias,"ide").query({path:x.fullPath}).toString()

    var icon = null;
    if(!isLeaf || x.children != null && Array.isArray(x.children) && x.children.length > 0) {
        icon = m('i', { class: 'fa fa-caret-right icon-left' });
    } else {
        var contentType = mime.contentType(x.value);
        if(contentType != null) {
            contentType = contentType.split(';')[0];
            if(contentTypeIcons.hasOwnProperty(contentType)) {
               icon = m('i', { class: 'icon-left '+contentTypeIcons[contentType]})
            }
        }
    }
    var children = [m('a', { class: classes, href }, [icon, x.value])];

    if(x.children != null && Array.isArray(x.children) && x.children.length > 0) {
        var childrenViews = Enumerable.from(x.children).select((b) => IDENavigationPropertyItemView(state, path, alias, b)).toArray();
        children.push(m('div', { class: 'list-group' }, childrenViews));
    }

    return children;
}

function getStorageApi(alias, path) {
    var response = null;
    $.ajax({
        url: "//localhost/solutions/" + alias + "/storage?path=" + path,
        dataType: 'json',
        async: false,
        success: function(data) {
            response = data;
        }
    });
    return response;
}

function getStorage_r(alias, path, children, loaded) {
    loaded = loaded || [];
    if(
        loaded.indexOf(path) >= 0 ||
        path == null
    ) {
        return children || null;
    }
    
    children = children || [];

    var storageResponse = getStorageApi(alias, path);
    var result = null;
    var parts = path.trim('/').split('/');
    var parentPath = parts.slice(0, parts.length-1).join('/');
    if(parentPath == null || parentPath.trim().length == 0) {
        parentPath = '/';
    }

    if(storageResponse != null) {
        if(storageResponse instanceof Array && storageResponse.length > 0) {
            
            result = Enumerable.from(storageResponse)
                .orderBy((x)=> !x.stats.isContainer)
                .toArray();
        } else {
            result = [storageResponse];
        }
    }
    
    if(
        parentPath != null
     ) {
        var arr = (result instanceof Array) ? result : [result];
        loaded.push(path);
        loaded = loaded.concat(Enumerable.from(arr).select((x) => x.name).toArray())
        children = children.concat(arr);
        return getStorage_r(alias, parentPath, children, loaded)
    }
    return result;
}

function getStorage(alias, path) {
    return getStorage_r(alias, path);
}

function isLeaf(e) {
    return e != null && !Array.isArray(e) && !e.stats.isContainer && e.body != null;
}

const IDE = {
    oninit: (vnode) => {
        vnode.state.storageReadme = null;
        vnode.state.previousAlias = null;
        vnode.state.previousPath = null;
        vnode.state.ide = new IDEState()
        vnode.tag.update(vnode);
    },
    update: (vnode) => {
        var path = vnode.attrs.path || "/";
        var alias = vnode.attrs.alias;
        
        if(vnode.state.previousAlias == null || vnode.state.previousAlias != alias) {
            vnode.state.ide.clear();
            vnode.state.previousAlias = alias;
        }

        if(vnode.state.previousPath == null || vnode.state.previousPath != path)
        {
            vnode.state.ide.treeViewState.propertyView = (x) => IDENavigationPropertyItemView(vnode.state.ide.treeViewState, path, alias, x);
            vnode.state.previousPath = path;
            if(!vnode.state.ide.editorContainerState.isOpen(path)) {
                var storageResult = getStorage(alias, path)
                var file = null;
                if(storageResult != null) {
                    file = storageResult[0];
                    if(file != null && !Array.isArray(file)) {
                        var treeViewItems = Enumerable.from(storageResult).select((x) => { return { key: x.name, isContainer: x.stats.isContainer, size: x.stats.size }; }).toArray();
                        vnode.state.ide.treeViewState.addRange(treeViewItems)
                        if(isLeaf(file)) {
                            vnode.state.ide.editorContainerState.set(path)
                            vnode.state.ide.editorContainerState.open(file)
                        }
                    }
                }
            } else {
                vnode.state.ide.editorContainerState.set(path)
            }
        }

        if(vnode.state.storageReadme == null && vnode.state.ide.editorContainerState.editorCount < 1) {
            var readmeResult = getStorage(alias, "/readme.md");
            vnode.state.storageReadme = false;
            if(readmeResult instanceof Array && readmeResult.length > 0) {
                readmeResult = readmeResult[0];

                if(isLeaf(readmeResult)) {
                    vnode.state.storageReadme = readmeResult;
                    if(vnode.state.ide.editorContainerState.editor == null) {
                        vnode.state.ide.editorContainerState.open(readmeResult);
                    }
                }
            }
        }
    },
    view: function(vnode) {
        var alias = vnode.attrs.alias;
        vnode.tag.update(vnode);
        return m(DockerComponent, { dock: 'root' }, [
                m(DockerComponent, { class: 'explorer', dock: 'left', weight: 0.2 },
                    m('div', [
                        m('ol', {class:'breadcrumb'}, [
                            m('li', {class:'breadcrumb-item'}, [
                                m('a', { href: '#!/solutions'}, ['Solutions']),
                            ]),
                            m('li', {class:'breadcrumb-item active'}, [
                                alias
                            ])
                        ]),
                        m(TreeViewComponent, vnode.state.ide.treeViewState)
                    ])
                ),
                m(DockerComponent, { dock: 'right', weight: 0.8, static: true },
                    m(EditorContainerComponent, { state: vnode.state.ide.editorContainerState, solution: alias })
                )
            ]);
    }
};

m.route(document.getElementById("view"), '/solutions', {
    '/solutions': Solutions,
    '/solution/:alias/ide': IDE
});