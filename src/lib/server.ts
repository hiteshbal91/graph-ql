// import inbuilt modules
import * as Express from 'express';

// import custom modules
import { json, urlencoded, RequestTimeout, Test, ErrorHandler, Authentication } from './middlewares';
import { Config } from './../framework/utils';
import Connection from './models/connection';
import { GraphQL } from './router';

// initialise database instance
const Database = Connection(Config.get('database'));

/**
 * RestAPI class provides abstraction over express.
 */
class RestAPI {
    private app;

    /**
     * Create RestAPI instance.
     */
    constructor() {
        this.app = Express();
    }

    /**
     * Calling all the pre-loaded middlewares.
     */
    loadMiddlewares() {
        // parse application/x-www-form-urlencoded
        this.app.use(urlencoded({ extended: true }));
        // parse application/json
        this.app.use(json({ limit: '100kb' }));
        // starting the request timer
        this.app.use(RequestTimeout);
        // checking the authentication
        this.app.use(Authentication);
        // this.app.use(Test);
        // request error handler
        // this.app.use(ErrorHandler);
    }

    /**
     * Loading all the routers
     */
    loadRouter() {
        // loading router
        this.app.use(GraphQL);
    }

    /**
     * Run http server on specified port. 
     * @param callback 
     */
    async listen(port: number) {
        return Database.init()
            .then(() => {
                // return new Promise((resolve, reject) => {
                const Server = this.app.listen(port);
                this.loadMiddlewares();
                this.loadRouter();
                return Promise.resolve(Server);
                // });
            })
    }
}

export default new RestAPI();

interface TearDown {
    (error: Error): void;
}

const ShutDown = (type: string): TearDown => {
    return (error: Error): void => {
        console.error({
            error: type,
            message: error.message || error
        });
        process.exit(0);
    }
};

// catch uncaughtException
process.on('uncaughtException', ShutDown('UncaughtException'));

// catch unhandledRejection
process.on('unhandledRejection', ShutDown('UnhandledRejection'));