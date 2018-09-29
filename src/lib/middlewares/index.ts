// import inbuilt modules
export { json, urlencoded } from 'express';

// import custom modules
export { RequestTimeout } from './request-timeout';
export { ErrorHandler } from './error-handler';
export { Authentication } from './authentication';

export const Test = (req, res, next) => {
    setTimeout((): void => {
        next();
    }, 2000);
}