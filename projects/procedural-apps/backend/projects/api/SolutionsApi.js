const ISolutionProvider = require("../services/ISolutionProvider");

class SolutionsApi {
    constructor(solutionProvider) {
        if(!(solutionProvider instanceof ISolutionProvider)) {
            throw new Error("[Invalid] Provider does not implement ISolutionProvider.");
        }
        this.solutionProvider = solutionProvider;
    }

    get(req, res) {
        res.header("ContentType", "application/json");
        if(req.params.alias == null || req.params.alias.trim() == '') {
            throw new Error("Unexpected alias.");
        }
        var result = this.solutionProvider.get(req.params.alias);
        if(result.length != 1) {
            throw new Error("Solution not identified.")
        }
        res.send(JSON.stringify(result[0]));
    }

    query(req, res) {
        res.header("ContentType", "application/json");
        var options = {
            size: req.query.size,
            offset: req.query.offset,
            search: {
                name: req.query.name
            }
        };
        var results = this.solutionProvider.query(options);
        res.send(JSON.stringify(results));
    }
}

module.exports = SolutionsApi;