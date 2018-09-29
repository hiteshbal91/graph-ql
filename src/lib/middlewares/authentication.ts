// import inbuilt modules
import { isEmpty } from 'lodash';

// import custom modules
import { UserSessions } from './../models/index';

const SkipUrls = [
    "sign-in"
];

export const Authentication = async (req, res, next) => {
    // skip authentication for given urls
    // if (~SkipUrls.indexOf(req.path))
    return next();

    // authtoken declaration
    const Authtoken = req.headers.authtoken; // || req.cookies.get('authtoken');

    if (!isEmpty(Authtoken)) {
        // checking the incoming body for authentication
        const User = await UserSessions.findOne({ authtoken: Authtoken }, { project: { email: 1 } });
        if (User === null) {
            return next({
                message: 'user.error.authentication',
                code: 1,
                statusCode: 401
            });
        }
    }
    return next({
        message: 'user.error.authentication',
        code: 1,
        statusCode: 401
    });
}
