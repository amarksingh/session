const kStore = Symbol('store')
/**
 * Class SessionStore.
 */
class SessionStore {
    /**
     * Create a new instance.
     * @param {*} $store
     */
    constructor($store: any) {
        this[kStore] = $store
    }
    /**
     * read method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    read(sid: string = '', cb: any) {
        this[kStore].read(sid, cb)
    }
    /**
     * write method.
     * @param {*} sid
     * @param {*} data
     * @param {*} cb
     * @returns {any}
     */
    write(sid: string = '', data: Record<string, any>, cb: any) {
        this[kStore].write(sid, data, cb)

    }
    /**
     * destroy method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    destroy(sid: string = '', cb: any) {
        this[kStore].destroy(sid, cb)

    }
    /**
     * destroyExpireSession method.
     * @param {*} maxAge
     * @returns {any}
     */
    destroyExpireSession(maxAge: any) {
        this[kStore].destroyExpireSession(maxAge)

    };
}
module.exports = SessionStore