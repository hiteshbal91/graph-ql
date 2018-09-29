
// import inbuilt modules
import { Types } from 'mongoose';
// import custom modules
import { Plans } from './../../models/index';

interface Parameters {
    readonly skip?: Number;
    readonly limit?: Number;
    readonly project?: any;
}

export default {
    plans: async (options: Parameters = {}) => {
        // definition of plans resolver
        const AllPlans = await Plans.find({ deleted_at: null }, options || {});
        return AllPlans;
    },
    plan: async (query, object, context) => {
        // definition of plan resolver
        const Plan = await Plans.findOne({ plan_id: query.uid, deleted_at: null }, {});
        return Plan;
    },
    createPlan: async ({ input }) => {
        // definition of createPlan resolver
        const Plan = await Plans.insertOne({ ...input });
        return Plan;
    },
    updatePlan: async (uid, { input }) => {
        // definition of updatePlan resolver
        const Plan = await Plans.findOneAndUpdate({ "_id": Types.ObjectId(uid) }, { ...input }, {});
        return Plan;
    },
    deletePlan: async (uid, { input }) => {
        // definition of deletePlan resolver
        const Plan = await Plans.findOneAndUpdate({ "_id": Types.ObjectId(uid) }, { ...input }, {});
        return Plan;
    }
}