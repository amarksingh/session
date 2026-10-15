require('@ostro/support/helpers')
const SessionStarter = require('./sessionStarter')
const InvalidCookieClassException = require('./invalidCookieClassException')
const CookieSession = require('./cookieSession')
const SessionStore = require('./sessionStore')
const Manager = require('@ostro/support/manager')

/**
 * Class SessionManager.
 */
class SessionManager  extends Manager {

    $type = 'session';

    /**
     * getSessionConfig method.
     * @returns {any}
     */
    getSessionConfig() {
        return this.$config[this.$type]
    }

    /**
     * config method.
     * @returns {any}
     */
    config() {
        let sessionConfig = this.getSessionConfig()
        return {
            ...sessionConfig,
            key: (this.$config['app'] && this.$config['app']['key']) || 'a@jf#H&5@6*1jV(>df6d!fk8^6g56%tt+b4'
        }
    }

    /**
     * start method.
     * @returns {any}
     */
    start() {
        return this.startSession(new SessionStarter(this.config(), new CookieSession(this.$container, this.config(), this.driver()), this.driver()))
    }
    
    /**
     * startSession method.
     * @param {*} session
     * @returns {any}
     */
    startSession(session: any) {
        return (request, response, next) => {
            session.start(request, response, next)
        }
    }

    /**
     * resolve method.
     * @param {*} name
     * @returns {any}
     */
    resolve(name: string) {
        var config = this.getSessionConfig();
        if ((this.$customCreators[this.getDriverName()])) {
            return this.callCustomCreator(config, name);
        }
        var driverName = this.getDriverName().split('.')
        var driverMethod = 'create' + driverName[0].ucfirst() + 'Driver';
        if (driverMethod in this) {
            return this[driverMethod](config, driverName);
        } else {
            throw new Error(`Driver [${this.getDriverName()}] is not supported.`);
        }
    }

    /**
     * callCustomCreator method.
     * @param {*} $config
     * @param {*} name
     * @returns {any}
     */
    callCustomCreator($config: Record<string, any>, name: string) {
        var driver = this.$customCreators[this.getDriverName()](this.$constraints, name, $config);
        return this.adapt(driver);
    }

    /**
     * createMemoryDriver method.
     * @param {*} $config
     * @returns {any}
     */
    createMemoryDriver($config: Record<string, any>) {
        return this.adapt((new(require('./adapter/memory'))($config['files'])));
    }

    /**
     * createFileDriver method.
     * @param {*} $config
     * @returns {any}
     */
    createFileDriver($config: Record<string, any>) {
        return this.adapt((new(require('./adapter/file'))($config['files'])))
    }

    /**
     * createDatabaseDriver method.
     * @param {*} $config
     * @returns {any}
     */
    createDatabaseDriver($config: Record<string, any>) {
        return this.adapt((new(require('./adapter/database'))(this.$container.db, $config['table'])))
    }

    /**
     * createCacheDriver method.
     * @param {*} $config
     * @param {*} driver
     * @returns {any}
     */
    createCacheDriver($config: Record<string, any>, driver: any) {
        return this.adapt((new(require('./adapter/cache'))(this.$container.cache.driver(driver[1]), $config)))
    }

    /**
     * adapt method.
     * @param {*} session
     * @returns {any}
     */
    adapt(session: any) {
        return new SessionStore(session);
    }

    /**
     * getDriverName method.
     * @returns {any}
     */
    getDriverName() {
        return super.getConfig('driver');
    }

    /**
     * getDefaultDriver method.
     * @returns {any}
     */
    getDefaultDriver() {
        return this.getDriverName();
    }
}

module.exports = SessionManager
