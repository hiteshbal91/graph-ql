import { pick } from 'lodash';
import * as express from 'express';

import Model from './../models';

const Router = express.Router();

export default Router;

Router
    .route("/")
    .get((req, res, next) => {
        const PostsModel = Model.getModel('posts');

        PostsModel.find({}, {})
            .then(posts => {
                return res.json({ posts });
            })
            .catch(next);
    })
    .post((req, res, next) => {
        const PostsModel = Model.getModel('posts');
        const Body = pick(req.body, ["title", "body"]);

        PostsModel.insert(Body)
            .then((post) => {
                return res.json({ post });
            })
            .catch(next);
    });;