import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { map } from 'lodash';

import { PostType } from './posts';
import Model, { ObjectID } from './../../models';

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User model graphql',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: GraphQLString
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: (user) => {
                // console.log("user : ", user.posts)
                if (user.posts && user.posts.length) {
                    user.posts = map(user.posts, (postId) => {
                        return ObjectID(postId);
                    });
                    const PostsQuery = Model.getModel('posts');
                    return PostsQuery.find({ _id: { "$in": user.posts || [] } });
                }
                return [];
            }
        }
    })
});

export const UserInputType = new GraphQLInputObjectType({
    name: "User Input",
    description: "Input user type for graphql",
    fields: () => ({
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    })
});