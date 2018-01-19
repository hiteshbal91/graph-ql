import * as express from 'express';
import { merge } from 'lodash';

import Middlewares from './middlewares/index';
import MountRoutes from './controllers/index';
import { Logger } from './../framework/utils';

/**
 * @class
 * Application is act as wrapper around application.
 */
export class Application {
    private express: express;

    constructor() {
        this.express = express();
        // setiting x-powered-by to false
        this.express.set("x-powered-by", false);
    }

    /**
     * @memberof Application
     */
    loadMiddlewares() {
        Middlewares(this.express);
    }

    /**
     * @memberof Application
     */
    mountRoutes() {
        MountRoutes(this.express);
    }

    /**
     * @memberof Application
     */
    loadErrorHandler() {
        // error handler - 404
        this.express.use((req, res, next) => {
            return next({
                message: "Page you are looking for it doesn't exists or temporarily suspended.",
                code: 404
            });
        });

        // error handler
        this.express.use((error, req, res, next) => {
            console.error("Error L ", error);
            let code = error.code || 500;
            try {
                code = parseInt(code);
            } catch (err) {
                Logger.error({ message: `Code Parsing : ${typeof error} :: ${code}` });
            }
            code = (code) ? code : 500;
            Logger.error(merge({
                time: new Date(),
                status: code,
            }, error));
            let template = "templates/50x";
            if (code > 399 && code < 500)
                template = "templates/40x";

            return res.status(code).json({ error });
        });
    }

    /**
     * @method getServer
     * Returns currently configured express server instance.
     * @returns {server}
     */
    public getServer(): express {
        return this.express;
    }
}

export default new Application();