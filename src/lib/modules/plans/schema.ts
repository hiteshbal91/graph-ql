export default `
    type Plan {
        plan_id: String!
        name: String!
        description: String
    }

    type Query {
        plans: [Plan!]
        plan(uid: String): Plan
    }

    input PlanInput {
        name: String!
        description: String
    }

    type Mutation {
        createPlan(input: PlanInput): Plan
    }

    type Mutation {
        updatePlan(plan_id: ID!, input: PlanInput): Plan
    }

    type Mutation {
        deletePlan(plan_id: ID!): Plan
    }
`;