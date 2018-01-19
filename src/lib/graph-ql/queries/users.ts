import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
} from 'graphql';

import Model from './../../models';
import { UserType } from './../types';

const Limit = 10;

export const UserQuery = {
    type: UserType,
    args: {
        id: {
            name: "ID",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, args, context) {
        const UsersModel = Model.getModel('users');
        return UsersModel.findOne({ id: args.id }, {});
    }
};

export const UsersQuery = {
    type: GraphQLList(UserType),
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
        const UsersModel = Model.getModel('users');
        return UsersModel.find({}, { skip: args.skip || 0, limit: args.limit || Limit });
    }
};