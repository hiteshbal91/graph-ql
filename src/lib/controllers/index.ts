import * as graphqlHTTP from 'express-graphql';

import Users from './users';
import Posts from './posts';
// import Schema from './../graph-ql';

// console.log("graphqlHTTP : ", require('express-graphql'))
// console.log("graphqlHTTP : ", graphqlHTTP)

export default function (app) {
    // app.use("/graphql", graphqlHTTP({
    //     schema: Schema,
    //     graphiql: true,
    //     pretty: true
    // }));
    // users routes
    app.use("/users", Users);
    // posts routes
    app.use("/posts", Posts);
}