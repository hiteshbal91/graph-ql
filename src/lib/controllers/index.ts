import * as graphqlHTTP from 'express-graphql';

import Users from './users';
import Posts from './posts';
import Schema from './../graph-ql';

export default function (app) {
    app.use("/graphql", graphqlHTTP({
        schema: Schema,
        graphiql: true,
        pretty: true
    }));
    // users routes
    app.use("/users", Users);
    // posts routes
    app.use("/posts", Posts);
}