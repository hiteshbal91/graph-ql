import * as BasicAuth from "basic-auth";

export default function (app) {
    // BasicAuthentication
    app.use((req, res, next) => {
        const Credentials = BasicAuth(req);
        if (!Credentials || Credentials.name !== 'tracking' || Credentials.pass !== 'eduavenir@321') {
            res.setHeader("WWW-Authenticate", "Basic");
            res.status(401).send("Access Denied !!!");
            return;
        }
        return next();
    });
}