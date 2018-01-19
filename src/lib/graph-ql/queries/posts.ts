import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
} from 'graphql';

import { PostType } from './../types';
import Model from './../../models';
const Limit = 10;

export const PostQuery = {
    type: PostType,
    args: {
        id: {
            name: "ID",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, args, context) {
        const PostsQuery = Model.getModel('posts');
        return PostsQuery.find({ _id: args.id });
    }
};

export const PostsQuery = {
    type: GraphQLList(PostType),
    args: {
        skip: {
            name: "Skip",
            type: GraphQLInt
        },
        limit: {
            name: "Limit",
            type: GraphQLInt
        }
    },
    resolve(root, args, context) {
        const PostsQuery = Model.getModel('posts');
        return PostsQuery.find({}, { skip: args.skip || 0, limit: args.limit || Limit });
    }
};