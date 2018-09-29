// import inbuilt modules
import { Router } from 'express';
import * as GraphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

// import custom modules
import { Types, Resolvers } from './../modules/index';

export const GraphQL = Router();

console.log("ResolverObject:  ", Resolvers);

GraphQL
    .route('/graphql')
    .all(GraphqlHTTP({
        schema: buildSchema(Types),
        rootValue: Resolvers,
        graphiql: true
    }));


