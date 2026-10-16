/**
 * Class SessionStoreException.
 */
class SessionStoreException {
    name: string;
    message: string;
    errors: unknown;
    statusCode: number;
    stack?: string;

    /**
     * Create a new instance.
     *
     * @param err - Underlying error or errors.
     */
    constructor(err: unknown) {
        this.name = this.constructor.name;
        this.message = 'Unable to store session';
        this.errors = err;
        this.statusCode = 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default SessionStoreException;