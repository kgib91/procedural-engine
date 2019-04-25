const fs = require('fs');
const path = require('path').win32;
const Enumerable = require("linq");
const ISolutionProvider = require("../services/ISolutionProvider");

class FlatfileSolutionProvider extends ISolutionProvider {
    constructor() {
        super();
        this.storageLocation = 'C:\\Users\\Family\\Desktop\\simulations\\backend\\localstorage\\';
        this.solutionsLocation = path.join(this.storageLocation, '\\solutions.json');
    }

    get(alias) {
        return this.query({size:1,offset:0,search: { alias }})
    }

    add(alias, access, provider) {
        var all = query();
        var model = {
            alias,
            provider: provider,
            access: access
        };
        all.push(model);
        fs.writeFileSync(this.solutionsLocation, all, 'utf8');
    }

    query(query) {
        query = query || {};

        var data = fs.readFileSync(this.solutionsLocation, 'utf8');
        var result = Enumerable.from(JSON.parse(data));
        if(query.search != null) {
            if(query.search.alias != null) {
                result = result.where((val) => { return val.name === query.search.alias; });
            }
        }
        if(query.offset != null) {
            result = result.skip(parseInt(query.offset));
        }
        if(query.size != null) {
            result = result.take(parseInt(query.size));
        }
        return result.toArray();
    }
}

module.exports = FlatfileSolutionProvider;