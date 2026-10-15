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
    read(sid: any, cb: any) {

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
    write(sid: any, data: Record<string, any>, cb: any) {
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
    destroy(sid: any, cb: any) {
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
    destroyExpireSession(maxAge: any) {
        Object.keys(storage).map(sid => {
            if (storage[sid].updated_at < (Date.now() - (maxAge*60000))) {
                delete storage[sid];
            }
        })
    };

}
module.exports = Memory