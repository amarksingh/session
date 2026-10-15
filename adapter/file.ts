const fs = require('fs-extra')
const path = require('path')
const kPath = Symbol('path')
/**
 * Class File.
 */
class File {
    /**
     * Create a new instance.
     * @param {*} path
     */
    constructor(path: string) {
        this[kPath] = path;
        fs.mkdirSync(this[kPath], {
            recursive: true
        })
    }

    /**
     * read method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    read(sid: any, cb: any) {
        fs.readJson(path.join(this[kPath], sid), cb)
    }

    /**
     * write method.
     * @param {*} sid
     * @param {*} data
     * @param {*} cb
     * @returns {any}
     */
    write(sid: any, data: Record<string, any>, cb: any) {
        fs.writeJson(path.join(this[kPath], sid), data, cb)
    }

    /**
     * destroy method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    destroy(sid: any, cb: any) {
        fs.unlink(path.join(this[kPath], sid), function(err) {
            if (typeof cb == 'function') {
                cb(err)
            }
        })
    }

    /**
     * destroyExpireSession method.
     * @param {*} maxAge
     * @returns {any}
     */
    destroyExpireSession(maxAge: any) {
        var self = this;
        fs.readdir(this[kPath], (err, files) => {
            if (err || files.length === 0) {
                return;
            }
            files.forEach((file) => {
                if (file[0] != '.') {
                    fs.stat(path.join(this[kPath], file), function(err, stat) {
                        if (!err) {
                            if (stat.isFile() && ((new Date()).getTime() - stat.atime.getTime() > (maxAge*60000))) {
                                self.destroy(file);
                            }
                        }
                    });
                }
            });
        });
    };

}
module.exports = File