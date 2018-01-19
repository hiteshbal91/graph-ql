import * as express from 'express';

import Model from './../models';

const Router = express.Router();

export default Router;

Router
    .get("/", (req, res, next) => {
        const PostsModel = Model.getModel('posts');

        PostsModel.find({}, {})
            .then(posts => {
                return res.json({ posts });
            })
            .catch(next);
    });