import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql';
import { UserType, PostType } from './types';
import Queries from './queries';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: Queries
    })
})