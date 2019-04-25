import 'bootstrap/js/tab';
import CodeMirrorComponent from "../ui/CodeMirrorComponent"
import InspectorComponent from "../ui/InspectorComponent"
import WorkflowComponent from "../ui/WorkflowComponent"
import URI from 'urijs'

const encodeId = (id) => {
    return id.replace(/[\./]/g, '_');
}

function url(url, search) {
    var uri = new URI(url.substr(2));
    for(var key in search) {
        uri.setQuery(key, search[key]);
    }
    return '#!'+uri;
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

const readModuleMetadata = (registries, alias, importName) => {
    var results = [];

    if(importName[0] == '/') {
        var reg = alias;
        var path = [importName, '.js'].join('');
        var result = getStorageApi(reg, path);
        results.push({
            solution: reg,
            name: importName,
            data: result
        });
    } else {
        for(var i = 0; i < registries.length; ++i) {
            var reg = registries[i];
            var path = ['/modules/', importName, '.js'].join('');
            var result = getStorageApi(reg, path);
            if(!Array.isArray(result)) {
                results.push({
                    solution: reg,
                    name: importName,
                    data: result
                });
                break;
            }
        }
    }

    var modules = {};
    for(var i = 0; i < results.length; ++i) {
        var name = results[i].name;
        var result = results[i].data;
        if(result != null && !Array.isArray(result) && !result.stats.isContainer) {
            var js = Buffer.from(result.body, 'base64').toString('utf8')
            var mod = new Function(['var module = {};',js,'return module;'].join('\r\n'));
            window.require = function(pack) {
                var mods = {
                    'jquery': 'http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
                    'mithril': 'http://cdnjs.cloudflare.com/ajax/libs/mithril/1.1.5/mithril.js',
                    'mathquill': [
                        'http://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1-b/mathquill.js',
                        'http://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1-b/mathquill.min.css'
                    ]
                };

                if(!mods.hasOwnProperty(pack)) {
                    throw new Error(`Failed to load package ${pack}`)
                }
                
                function get(url) {
                    var id = encodeId(url);
                    if ($('#'+id)[0] == null)
                    {
                        var head = $('head');
                        if(url.indexOf('.css') != -1) {
                            var link = $('<link>', { id: id, rel: 'stylesheet', type: 'text/css', href: url, media: 'all' });
                            head.append(link);
                        } else if(url.indexOf('.js') != -1) {
                            var script = $('<script>', { id: id, async: false, type: 'text/javascript', src: url });
                            head.append(script);
                        }
                    }
                }

                var cdn = mods[pack];
                if(Array.isArray(cdn)) {
                    for(var i = 0; i < cdn.length; ++i) {
                        get(cdn[i]);
                    }
                } else {
                    get(cdn);
                }
            };
            modules[name] = mod.apply(window, []);
        }
    }

    return modules;
}

const default_solutions = [
    "codemap"
];

const WorkflowEditor = {
    oninit: function(vnode) {
        var data = vnode.state.content = JSON.parse(vnode.attrs.value);
        var reg = data.registries || default_solutions;
        var alias = m.route.param('alias');

        var modules = {};
        for(var i = 0; i < data.import.length; ++i) {
            var imp = data.import[i];
            var mod = readModuleMetadata(reg, alias, imp);
            $.extend(modules, mod);
        }
        setTimeout(function() { 
            vnode.state.modules = modules;
            m.redraw();
        }, 1000)

        var internal = vnode.attrs.onchange;
        vnode.attrs.onchange = (content) => {
            if(typeof(content) == 'string') {
                content = JSON.parse(content);
            }
            vnode.state.content = content;
            if(internal != null) {
                internal(content);
            }
        }
    },
    view: function(vnode) {
        var jsonUrl = url(location.hash, {interface:'json'});
        var propsUrl = url(location.hash, {interface:'properties'});
        var wfUrl = url(location.hash, {interface:'workflow'});
        
        var activeTab = m.route.param("interface") || 'json';

        return [
            m("div", { class: "tab-content" }, [
                m("div", { class: "tab-pane" + (activeTab == 'json' ? ' active' : ''), id: "json", role: "tabpanel" }, [
                    m(CodeMirrorComponent, vnode.attrs)
                ]),
                m("div", { class: "tab-pane" + (activeTab == 'properties' ? ' active' : ''), id: "properties", role: "tabpanel" }, [
                    m('div', {class:'jumbotron'}, [
                        m(InspectorComponent, {
                            data: vnode.state.content,
                            import: "name,import"
                        }),
                        m('div', {class:'clearfix'})
                    ])
                ]),
                m("div", { class: "tab-pane" + (activeTab == 'workflow' ? ' active' : ''), id: "workflow", role: "tabpanel" }, [
                    vnode.state.modules == null ? [] : m(WorkflowComponent, {
                        onchange: vnode.attrs.onchange,
                        content: vnode.state.content,
                        modules: vnode.state.modules
                    })
                ])
            ]),
            m('footer', [
                m('div', [
                    m("ul", { class: "nav nav-tabs nav-bottom" }, [
                        m("li", { class: "nav-item" + (activeTab == 'json' ? ' active' : '') }, [
                            m("a", {class: 'nav-link', href:jsonUrl}, [m('i', {class:'icon icon-left fa fa-file-code-o'}), "Json"])
                        ]),
                        m("li", { class: "nav-item" + (activeTab == 'properties' ? ' active' : '') }, [
                            m("a", {class: 'nav-link', href:propsUrl}, [m('i', {class:'icon icon-left fa fa-cog'}), "Properties"])
                        ]),
                        m("li", { class: "nav-item" + (activeTab == 'workflow' ? ' active' : '') }, [
                            m("a", {class: 'nav-link',  href:wfUrl}, [m('i', {class:'icon icon-left fa fa-sitemap'}), "Workflow"])
                        ])
                    ])
                ])
            ])
        ];
    }
}

export default WorkflowEditor;