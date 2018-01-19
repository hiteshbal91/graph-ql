import { pick } from 'lodash';
import * as express from 'express';

import Model from './../models';

const Router = express.Router();

export default Router;

Router
    .route("/")
    .get((req, res, next) => {
        const UsersModel = Model.getModel('users');

        UsersModel.find({}, {})
            .then((users) => {
                return res.json({ users });
            })
            .catch(next);
    })
    .post((req, res, next) => {
        const UsersModel = Model.getModel('users');
        const Body = pick(req.body, ["first_name", "last_name", "email", "posts"]);

        // console.log("Body :", Body);

        UsersModel.insert(Body)
            .then((user) => {
                // console.log("req.body : ", req.body)
                return res.json({ user });
            })
            .catch(next);
    });