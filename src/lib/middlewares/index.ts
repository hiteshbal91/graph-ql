import * as express from 'express';
import { join } from "path";

import { Config } from './../../framework/utils';
import BasicAuth from './basic-auth';
import RequestTimeout from './request-timeout';

export default function (app) {
    // loading Basic Authentication
    // BasicAuth(app);
    // static files loading
    // app.use("/favicon,ico", express.static(join(Config.get("static.path"), "images")));
    // app.use(Config.get("static.url_prefix"), express.static(Config.get("static.path"), Config.get("static.options")));
    // request logger and timeout
    RequestTimeout(app);
    // for content-type: json 
    app.use(express.json({ limit: '2mb', type: "application/json" }));
    // for content-type: x-www-url-encoded 
    app.use(express.urlencoded({ extended: true, limit: '2mb' }));
}