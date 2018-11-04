// import inbuilt modules
const { ApolloServer } = require('apollo-server');

// import custom modules
// import { json, urlencoded, RequestTimeout, Test, ErrorHandler, Authentication } from './middlewares';
import { Config } from './../framework/utils';
import Connection from './models/connection';
import { Types as typeDefs, Resolvers as resolvers } from './modules';

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
        this.app = new ApolloServer({ typeDefs, resolvers, resolverValidationOptions: { requireResolversForResolveType: false } });
    }

    /**
     * Calling all the pre-loaded middlewares.
     */
    loadMiddlewares() {
        // parse application/x-www-form-urlencoded
        // this.app.use(urlencoded({ extended: true }));
        // parse application/json
        // this.app.use(json({ limit: '100kb' }));
        // starting the request timer
        // this.app.use(RequestTimeout);
        // checking the authentication
        // this.app.use(Authentication);
        // this.app.use(Test);
        // request error handler
        // this.app.use(ErrorHandler);
    }

    /**
     * Loading all the routers
     */
    loadRouter() {
        // loading router
    }

    /**
     * Run http server on specified port. 
     * @param callback 
     */
    async listen(port: number, callback) {
        return Database.init()
            .then(() => {
                // return new Promise((resolve, reject) => {
                const Server = this.app.listen(port, callback);
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