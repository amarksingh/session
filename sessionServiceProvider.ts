const ServiceProvider = require('@ostro/support/serviceProvider');
const SessionManager = require('./sessionManager')
/**
 * Class SessionServiceProvider.
 */
class SessionServiceProvider extends ServiceProvider {
    /**
     * register method.
     * @returns {any}
     */
    register() {
        this.registerSessionManager();
    }

    /**
     * boot method.
     * @returns {any}
     */
    boot() {
        this.registerSessionDriver();
    }

    /**
     * registerSessionManager method.
     * @returns {any}
     */
    registerSessionManager() {
        this.$app.singleton('session', function(app) {
            return new SessionManager(app);
        });
    }

    /**
     * registerSessionDriver method.
     * @returns {any}
     */
    registerSessionDriver() {
        this.$app.singleton('session.store', function(app) {
            return app.session.driver();
        });
    }

}
module.exports = SessionServiceProvider