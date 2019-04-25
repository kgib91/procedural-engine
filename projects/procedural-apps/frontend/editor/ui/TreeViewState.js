function posixPath(path) {
    return path.replace(/\\/g, '/')
}

class TreeViewState {
    constructor() {
        this.paths = {};
        this.tree = { value: '/', fullPath: '/', children: []};
        this.propertyView = null;
    }
    encodeKey(key) {
        return posixPath(btoa(key).replace(/=/g, ''))
    }
    get(key) {
        var akey = this.encodeKey(key);
        if(!this.paths.hasOwnProperty(akey)) {
            return null;
        }
        return this.paths[akey]; // returns tree node handle
    }
    clear() {
        for(var key in this.paths) {
            delete this.paths[key];
        }
    }
    add(item) {
        var key = null;
        var extras = null;
        if(!(item instanceof String)) {
            key = item.key;
            extras = item;
        }
        var akey = this.encodeKey(key);
        var parts = posixPath(key).split('/');
        var node = this.tree.children;
        var fullPath = "";
        for(var i = 1; i < parts.length; ++i) {
            var base = parts[i];
            fullPath += "/"+base;
            var childIndex = -1;
            for(var j = 0; j < node.length; ++j) {
                if(node[j].value === base) {
                    childIndex = j;
                }
            }
            var childNode = (childIndex >= 0) ? node[childIndex] : { children: [] };
            childNode.value = childNode.value || base;
            childNode.fullPath = fullPath;
            childNode.data = extras;
            if(childIndex == -1) {
                node.push(childNode);
            }
            node = childNode.children;
        }
        this.paths[akey] = node;
    }
    addRange(items) {
        if(!Array.isArray(items)) {
            throw new Error("Failed to addrange for tree view, input is not an array.")
        }
        for(var i in items) {
            this.add(items[i]);
        }
    }
    remove(key) {
        var akey = this.encodeKey(key);
        delete this.paths[akey];
    }
}

module.exports = TreeViewState;