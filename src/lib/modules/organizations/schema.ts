import { GraphQLSchema } from 'graphql';

// defining the schema for organizations

// const OrgSchema = new GraphQLSchema({});

export default `
    type Organization {
        uid: String!
        name: String!
        description: String
        owner_uid: String!
        expiresOn: String!
        planId: [String!]!  
        orgPlans: [Plan]
    }
    
    input OrganizationInput {
        name: String!
        description: String
        expiresOn: String!
        planId: [String!]!
    }
    
    type Query {
        organizations: [Organization!]
        organization(uid: String): Organization
    }

    type Mutation {
        addOrganization(input: OrganizationInput): Organization
    }

    type Mutation {
        updateOrganization(uid: String!, input: OrganizationInput): Organization
    }

    type Mutation {
        assignPlan(uid: String!, input: OrganizationInput): Organization
    }
`;