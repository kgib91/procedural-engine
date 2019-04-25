class IStorageProvider {
    get(access, path) { throw new Error("Not implemented exception."); }
}
module.exports = IStorageProvider;