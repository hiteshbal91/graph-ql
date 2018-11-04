export default `
    type Plan {
        plan_id: String!
        name: String!
        description: String
    }

    input PlanQueryInput {
        name: String!        
    }

    extend type Query {
        plans(query: PlanQueryInput, limit: Int! = 10, skip: Int! = 0): [Plan!]
        plan(uid: String!): Plan
    }

    input PlanInput {
        name: String!
        description: String
    }

#    type Mutation {
#        createPlan(input: PlanInput): Plan
#        updatePlan(plan_id: ID!, input: PlanInput): Plan
#        deletePlan(plan_id: ID!): Plan
#    }
`;