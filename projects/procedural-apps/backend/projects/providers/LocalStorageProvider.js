const fs = require('fs');
const path = require('path').win32;
const Enumerable = require("linq");
const IStorageProvider = require("../services/IStorageProvider");

class LocalStorageProvider extends IStorageProvider {
    get(access, relativePath, options) {
        options = options || {};
        var fullPath = path.join(access.path, relativePath);
        var stats = fs.statSync(fullPath);
        if(!stats.isDirectory()) {
            return {
                name: relativePath,
                directory: path.dirname(relativePath),
                body: new Buffer(fs.readFileSync(fullPath)).toString('base64'),
                stats: {
                    size: stats.size,
                    atime: stats.atime,
                    ctime: stats.ctime,
                    mtime: stats.mtime,
                    isContainer: stats.isDirectory()
                }
            };
        }

        var files = fs.readdirSync(fullPath);
        var items = Enumerable.from(files)
        .select((subPath) => {
            var relSubPath = path.join(fullPath, subPath);
            stats = fs.statSync(relSubPath);
            return {
                name: path.join(relativePath, subPath),
                directory: relativePath,
                stats: {
                    size: stats.size,
                    atime: stats.atime,
                    ctime: stats.ctime,
                    mtime: stats.mtime,
                    isContainer: stats.isDirectory()
                }
            };
        })
        .toArray()

        return items;
    }
}

module.exports = LocalStorageProvider;