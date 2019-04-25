import Enumerable from 'linq';

const TreeViewProperty = (x) => {
    var result = [m("a", { class: 'list-group-item' }, x.value)];
    if(x.children != null && Array.isArray(x.children) && x.children.length > 0) {
        var childItems = Enumerable.from(x.children).select(TreeViewProperty).toArray();
        result.push(m('div', { class: 'list-group' }, childItems));
    }
    return result;
}

const TreeViewComponent = {
    view: (vnode) => {
        var state = vnode.attrs;
        var propertyView = state.propertyView || TreeViewProperty;
        var list = [];
        return m("div", { class: 'list-group' }, propertyView(state.tree));
    }
};

export default TreeViewComponent;