// import inbuilt modules
// import * as onHeaders from 'on-headers';
const OnHeaders = require('on-headers');

// import custom modules
import { Config } from './../../framework/utils';

export const RequestTimeout = ((req, res, next) => {
    const StartTime: number = new Date().getTime();

    // setting the Powered-By to Contentstack API
    res.set('X-Powered-By', 'Contentstack API');

    // setting timeout to defined time
    const Timer = setTimeout((): void => {
        if (!res.finished)
            res.send(`Requested url ${req.url} is timedout.`);
    }, Config.get('timeout') || 10000);

    // cleartimer on response is send
    OnHeaders(res, (): void => {
        const EndTime: number = new Date().getTime();
        res.set('X-RUNTIME', (EndTime - StartTime));
        clearTimeout(Timer);
    });

    return next();
});