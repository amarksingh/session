/**
 * Class startSession.
 */
class startSession {
    /**
     * Create a new instance.
     */
    constructor() {
        this.$session = this.$app['session'];
        if (this.$session instanceof require('../sessionManager')) {
            this.$registered = true;
            this.startSession = this.$session.start()
        }
    }

    /**
     * handle method.
     * @param {*} { request
     * @param {*} response
     * @param {*} next }
     * @returns {any}
     */
    handle({ request, response, next }: Record<string, any>) {
        if (!this.$registered) {
            return next()
        }
        this.startSession(request, response, next)
    }
}

module.exports = startSession