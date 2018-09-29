export default `
    type User {
        uid: String!
        email: String
        username: String
        lastLogin: String
        roles: [Role!]!
    }
    
    type Query {
        users: [User!]!
        userByToken(token: String!): User
        user(uid: ID!): User
    }

    type Mutation {
        addUser(email: String!, password: String!, confirmPassword: String!, roles: [Role!]!): User
    }
`;