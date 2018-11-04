// inbuilt modules

export default `
    """
    Organization is contentstack organization which has relation with plan
    """
    type Organization implements SysFields {
        uid: String!
        name: String!
        description: String
        owner_uid: String!
        expires_on: String!
        plan_id: String!
        created_at: String
        updated_at: ISODate
        created_by: String
        updated_by: String
    }
    
    input QueryOrganizationsInput {
        name: String!
        plan_id: String!
    }
    
    type Query {
        organizations(query: QueryOrganizationsInput, limit: Int! = 10, skip: Int! = 0): [Organization!]
        organization(uid: String!): Organization
    }

        
    input OrganizationInput {
        name: String!
        description: String
        expires_on: String!
        plan_id: String!
    }

    type Mutation {
        addOrganization(input: OrganizationInput): Organization
#        updateOrganization(uid: String!, input: OrganizationInput): Organization
#        assignPlan(uid: String!, input: OrganizationInput): Organization
    }
`;