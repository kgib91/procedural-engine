var ls = require('local-storage');

function posixPath(path) {
    return path.replace(/\\/g, '/')
}

export default class EditorContainerState {
    constructor() {
        this.drafts = {};
        this.editorCount = 0;
        this.activeKey = null;
        this.editors = {};
    }
    encodeKey(key) {
        return btoa(posixPath(key)).replace(/=/g, '')
    }
    draft(data) {
        var akey = this.encodeKey(data.name);
        this.drafts[akey] = data.body;
        m.redraw();
        ls.set(`editor_draft_${akey}`, data.body);
    }
    isDraft(key) {
        var akey = this.encodeKey(key);
        return this.drafts.hasOwnProperty(akey);
    }
    isOpen(key) {
        var akey = this.encodeKey(key);
        return this.editors.hasOwnProperty(akey);
    }
    get(key) {
        var akey = this.encodeKey(key);
        if(!this.editors.hasOwnProperty(akey)) {
            return null;
        }
        return this.editors[akey];
    }
    set(key) {
        this.activeKey = this.encodeKey(key);
    }
    open(data) {
        var akey = this.encodeKey(data.name);
        if(!this.editors.hasOwnProperty(akey)) {
            this.editorCount++;
        }

        var localBody = ls.get(`editor_draft_${akey}`);
        if(localBody != null) {
            data.body = localBody;
            this.drafts[akey] = data.body;
        }

        this.editors[akey] = data;
        if(this.activeKey == null) {
            this.activeKey = akey;
        }
    }
    close(key) {
        if(this.isDraft(key)) {
            if(!confirm('This file has been modified, do you want to close?')) {
                return;
            }
        }
        var akey = this.encodeKey(key);
        if(this.editors.hasOwnProperty(akey)) {
            this.editorCount--;
        }
        if(this.activeKey == akey) {
            this.activeKey = null;
        }
        delete this.drafts[akey];
        delete this.editors[akey];
    }
    clear() {
        for(var key in this.editors) {
            delete this.editors[key];
        }
        this.editorCount = 0;
    }
}