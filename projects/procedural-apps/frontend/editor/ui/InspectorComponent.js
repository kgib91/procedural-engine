

const InspectorComponent = {
    view: (vnode) => {
        var onChange = () => console.log(arguments);
        var renderNode = (node, keys, ns) => {
            var items = [];
            if(Array.isArray(node)) {
                items.push([
                    m('div', {class:'col-sm-12'}, [
                        m('label', ns+'['+node.length+']')
                    ])
                ])
                for(var key in node) {
                    var id = ns + '.' + key;
                    if(keys != null && keys.indexOf(key) == -1)
                        continue;
                    items.push(
                        renderNode(node[key], null, id)
                    );
                }
            } else if(node instanceof Object) {
                items.push([
                    m('div', {class:'col-sm-12'}, [
                        m('label', ns)
                    ])
                ])
                for(var key in node) {
                    var id = ns + '.' + key;
                    if(keys != null && keys.indexOf(key) == -1)
                        continue;
                    items.push(
                        renderNode(node[key], null, id)
                    );
                }
            } else {
                var nsParts = ns.split('.');
                items.push(
                    m('div', {class:'col-sm-12'}, [
                        m('div', {class:'input-group'}, [
                            m('label', {class:'input-group-addon', for:ns}, nsParts[nsParts.length - 1]),
                            m('input', {class:'form-control', id:ns, type:'text', value:node})
                        ])
                    ])
                );
            }
            return items;
        }
        var importKeys = vnode.attrs.import.split(',');
        var node = vnode.attrs.data;
        return m('div', [
            m('div', { class: 'col-md-6' }, [
                renderNode(node, importKeys, 'object')
            ])
        ]);
    }
}

export default InspectorComponent;