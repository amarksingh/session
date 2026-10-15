var storage = Object.create(null)
/**
 * Class Memory.
 */
class Memory {
    /**
     * read method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    read(sid, cb) {

        if (storage[sid]) {
            cb(null, storage[sid].data)
        } else {
            cb(true, null)
        }
    }

    /**
     * write method.
     * @param {*} sid
     * @param {*} data
     * @param {*} cb
     * @returns {any}
     */
    write(sid, data, cb) {
        storage[sid] = {
            updated_at: Date.now(),
            data: data
        }
        cb(null)
    }

    /**
     * destroy method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    destroy(sid, cb) {
        if (storage[sid]) {
            delete storage[sid];
        }
        cb(null)
    }

    /**
     * destroyExpireSession method.
     * @param {*} maxAge
     * @returns {any}
     */
    destroyExpireSession(maxAge) {
        Object.keys(storage).map(sid => {
            if (storage[sid].updated_at < (Date.now() - (maxAge*60000))) {
                delete storage[sid];
            }
        })
    };

}
module.exports = Memory