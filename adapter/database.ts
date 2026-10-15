const fs = require('fs-extra')
const path = require('path')
const kConnection = Symbol('connection')
const kTable = Symbol('table')

/**
 * Class Database.
 */
class Database {
    /**
     * Create a new instance.
     * @param {*} connection
     * @param {*} table
     */
    constructor(connection, table) {
        this[kConnection] = connection;
        this[kTable] = table;
    }

    /**
     * read method.
     * @param {*} sid
     * @param {*} cb
     * @returns {any}
     */
    read(sid, cb) {
        this[kConnection].table(this[kTable]).where({ sid }).value('payload').then(res => {
            cb(null, (res ? JSON.parse(res) : null))
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
        this[kConnection].table(this[kTable]).updateOrInsert({ sid }, { payload: JSON.stringify(data) }).then(res => {
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
        this[kConnection].table(this[kTable]).where({ sid }).delete().then(res => {
            cb(null, true)
        }).catch(err => {
            cb(err, false)
        })
    }

}
module.exports = Database
