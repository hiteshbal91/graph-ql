
// import inbuilt modules
import { Types } from 'mongoose';
// import custom modules
import Model from './model';

interface Parameters {
    readonly skip?: Number;
    readonly limit?: Number;
    readonly query?: any;
}

export default {
    Query: {
        plans: async (parent, args: Parameters, context, info) => {
            // definition of plans resolver
            const AllPlans = await Model.find({}, {}, args);
            return AllPlans;
        },
        plan: async (query, object, context) => {
            // definition of plan resolver
            const Plan = await Model.findOne({ plan_id: query.uid, deleted_at: null }, {});
            return Plan;
        },
    }
    // createPlan: async ({ input }) => {
    //     // definition of createPlan resolver
    //     const Plan = await Model.insertOne({ ...input });
    //     return Plan;
    // },
    // updatePlan: async (uid, { input }) => {
    //     // definition of updatePlan resolver
    //     const Plan = await Model.findOneAndUpdate({ "_id": Types.ObjectId(uid) }, { ...input }, {});
    //     return Plan;
    // },
    // deletePlan: async (uid, { input }) => {
    //     // definition of deletePlan resolver
    //     const Plan = await Model.findOneAndUpdate({ "_id": Types.ObjectId(uid) }, { ...input }, {});
    //     return Plan;
    // }
}