import { Config, Logger } from './framework/utils';
import Model from './lib/models';
import Application from './lib';

const PORT = process.env.PORT || 5500;
let server = null;

Model.connect()
    .then((database) => {
        Application.loadMiddlewares();
        Application.mountRoutes();
        Application.loadErrorHandler();
        return Promise.resolve();
    })
    .then(() => {
        const APP = Application.getServer();
        server = APP.listen(PORT, () => {
            Logger.log(`Application(${Config.get("environment")}) is running on ${PORT}`);
        });
        return Promise.resolve();
    });


process.on('uncaughtException', (err) => {
    Logger.error({ type: "UncaughtException Error", "message": err.message || err });
    server.close();
    Model.close();
    process.exit(0);
});
