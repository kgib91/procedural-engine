const buildCSS = (obj) => {
    var css = [];
    for(var key in obj) {
        css.push([key,obj[key]].join(':'))
    }
    return css.join(';');
};

const DockerComponent = {
    oninit: (vnode) => {
        vnode.state = {
            width: (vnode.attrs != null ? vnode.attrs.width : null) || 0,
            height: (vnode.attrs != null ? vnode.attrs.height : null) || 0,
            mode: (vnode.attrs != null ? vnode.attrs.mode : null) || 'nested',
            x: (vnode.attrs != null ? vnode.attrs.x : null) || 0,
            y: (vnode.attrs != null ? vnode.attrs.y : null) || 0
        };
    },
    view: (vnode) => {
        var style = null;

        var cells = [];
        var xWeight = 0;
        var yWeight = 0;
        var left = 0;
        var top = 0;
        var width = 0;
        var height = 0;
        for(var i = 0; i < vnode.children.length; ++i) {
            var child = vnode.children[i];
            if(child.attrs != null) {
                if(child.attrs.dock == 'left') {
                    left = xWeight;
                    width = child.attrs.weight || 'auto';
                    xWeight += width;
                }
                if(child.attrs.dock == 'right') {
                    left = xWeight;
                    width = child.attrs.weight || 'auto';
                    xWeight += width;
                }
            }
            cells.push({
                top,
                left,
                width,
                height,
                child
            })
        }
        
        var children = [];
        for(var i = 0; i < cells.length; ++i) {
            var cell = cells[i];
            var styles = { position: 'absolute' };

            styles.top = ((cell.top * 100) | 0) + '%';
            styles.left = ((cell.left * 100) | 0) + '%';
            if(cell.height != 0) {
                styles.height = ((cell.height * 100) | 0) + '%';
            } else {
                styles.bottom = '0%';
            }
            if(cell.width != 0) {
                styles.width = ((cell.width * 100) | 0) + '%';
            } else {
                styles.right = '0%';
            }
            var style = buildCSS(styles);
            children.push(
                m('div', { style }, cell.child)
            );
        }

        return m('div', { class: [vnode.attrs.class,'docker-component',(vnode.attrs.mode != 'nested' ? vnode.attrs.mode : null)||''].join(' ') }, children)
    }
}

export default DockerComponent;