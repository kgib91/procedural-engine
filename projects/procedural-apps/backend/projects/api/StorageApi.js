const IStorageProvider = require("../services/IStorageProvider");
const ISolutionProvider = require("../services/ISolutionProvider");
const ISolution = require("../services/ISolution");

class StorageApi {
    constructor(solutionProvider, storageProvider) {
        if(!(storageProvider instanceof IStorageProvider)) {
            throw new Error("[Invalid] Provider does not implement IStorageProvider.");
        }
        if(!(solutionProvider instanceof ISolutionProvider)) {
            throw new Error("[Invalid] Provider does not implement IStorageProvider.");
        }
        this.storageProvider = storageProvider;
        this.solutionProvider = solutionProvider;
    }

    get(req, res) {
        res.header("ContentType", "application/json");
        if(req.params.alias == null || req.params.alias.trim() == '') {
            throw new Error("Unexpected alias.");
        }
        var alias = req.params.alias;
        var result = this.solutionProvider.get(alias);
        if(result.length != 1) {
            throw new Error("Solution not identified.")
        }
        var solution = result[0];
        var path = req.query.path || "/";
        var result = this.storageProvider.get(solution.access, path);
        res.send(JSON.stringify(result));
    }
}

module.exports = StorageApi;