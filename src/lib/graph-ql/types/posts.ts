import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

export const PostType = new GraphQLObjectType({
    name: "Posts",
    description: "Posts graphql object",
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }
    })
})