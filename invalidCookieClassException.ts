/**
 * Class InvalidCookieClassException.
 */
class InvalidCookieClassException {
    /**
     * Create a new instance.
     * @param {*} message
     */
    constructor(message) {
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = 500;
        Error.captureStackTrace(this, this.constructor);

    }
}

module.exports = InvalidCookieClassException