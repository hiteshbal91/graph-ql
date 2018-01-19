import { isArray, merge } from 'lodash';

import { Logger } from './../../framework/utils';

export default function (app) {
    const Timeout = 20 * 1000;
    // RequestTimeout
    app.use((req, res, next) => {
        // over writing response render 
        const Render = res.render;
        res.render = (function () {
            return function (template, data) {
                merge(data, req.session);
                return Render.call(res, template, data);
            }
        }());

        let timer = setTimeout(() => {
            req.emit('timeout');
        }, Timeout);

        const ClearTimeout = () => {
            clearTimeout(timer);
        };

        let startTime = new Date().getTime();
        // setting the start time for the request
        req.startTime = startTime;

        res.on('finish', () => {
            let clientIp = req.connection.remoteAddress || req.ip || req.ips || [];
            const Now = new Date();
            Logger.log({
                time: Now,
                status: res.statusCode,
                client_ip: (isArray(clientIp) ? clientIp.shift() : clientIp),
                url: req.originalUrl,
                duration: (Now.getTime() - startTime)
            });
            clearTimeout(timer);
        });

        res.on('headers', () => {
            clearTimeout(timer);
        });

        req.on('timeout', () => {
            return next({
                message: "Request timedout, too much processing required.",
                code: 504
            });
        });

        return next();
    });
}