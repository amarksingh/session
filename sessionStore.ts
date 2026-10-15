const kStore = Symbol('store')
/**
 * Class SessionStore.
 */
class SessionStore {
    /**
     * Create a new instance.
     * @param {*} $store
     */
    constructor($store) {
        this[kStore] = $store
    }
    /**
     * read method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    read(sid = '', cb) {
        this[kStore].read(sid, cb)
    }
    /**
     * write method.
     * @param {*} sid
     * @param {*} data
     * @param {*} cb
     * @returns {any}
     */
    write(sid = '', data, cb) {
        this[kStore].write(sid, data, cb)

    }
    /**
     * destroy method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    destroy(sid = '', cb) {
        this[kStore].destroy(sid, cb)

    }
    /**
     * destroyExpireSession method.
     * @param {*} maxAge
     * @returns {any}
     */
    destroyExpireSession(maxAge) {
        this[kStore].destroyExpireSession(maxAge)

    };
}
module.exports = SessionStore