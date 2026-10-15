const path = require('path')
const kConnection = Symbol('connection')
const kMaxAge = Symbol('maxAge')

/**
 * Class Cache.
 */
class Cache {
    /**
     * Create a new instance.
     * @param {*} connection
     * @param {*} $config
     */
    constructor(connection, $config) {
        this[kConnection] = connection;
        let driverOptions = $config.stores[$config['driver'].split('.')[0]];
        this[kMaxAge] = typeof driverOptions == 'object' ? driverOptions.checkPeriod : undefined;

    }
    /**
     * read method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    read(sid, cb) {
        this[kConnection].get('session.' + sid).then(res => {
            cb(null, JSON.parse(res))
        }).catch(err => {
            cb(err, null)
        })
    }
    /**
     * write method.
     * @param {*} sid
     * @param {*} data
     * @param {*} cb
     * @returns {any}
     */
    write(sid, data, cb) {
        this[kConnection].put('session.' + sid, JSON.stringify(data), this[kMaxAge]).then(res => {
            cb(null, res)
        }).catch(function(err) {
            cb(err, null)
        })
    }
    /**
     * destroy method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    destroy(sid, cb) {
        this[kConnection].forget('session.' + sid).then(res => {
            cb(null, true)
        }).catch(err => {
            cb(err, false)
        })
    }

}
module.exports = Cache