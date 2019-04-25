class ISolutionProvider {
    get(name) { throw new Error("Not implemented exception."); }
    add(name, storageprovider, access) { throw new Error("Not implemented exception."); }
    query(query) { throw new Error("Not implemented exception."); }
};
module.exports = ISolutionProvider;