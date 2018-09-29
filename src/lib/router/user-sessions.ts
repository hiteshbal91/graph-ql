// import inbuilt modules
import { Router } from 'express';

// import custom modules
import { UserSessions } from './../models/index';

const UserSession = Router();

UserSession
    .route('/sign-in')
    .post(async (req, res, next) => {
        try {
            // logic for validation of admin user
            const Session = await UserSessions.findOneAndUpdate({ email: req.body.email, password: "" }, { "$set": { authtoken: "", lastLogin: new Date() } }, { project: { username: 1, email: 1, roles: 1 } });

            return next();
        } catch (error) {
            return next(error);
        }
    });

export default UserSession;
