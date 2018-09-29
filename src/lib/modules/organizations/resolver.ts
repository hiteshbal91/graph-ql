
// import inbuilt modules
import { Types } from 'mongoose';
// import custom modules
import { Organizations, Plans } from './../../models/index';

export default {
    orgPlans: async (args, context, info) => {
        console.log("parent object : ", args);
        return await Plans.findOne({}, {});
    },
    organization: async (uid: String = "") => {
        console.log("Query : ", uid, arguments[0]);
        // definition of organizations resolver
        const Orgs = await Organizations.findOne({}, {});
        return Promise.resolve(Orgs);
    },
    organizations: async () => {
        console.log("Query : ", arguments[0]);
        // definition of organizations resolver
        const Orgs = await Organizations.find({}, {});
        return Promise.resolve(Orgs);
    },
    addOrganization: async ({ input }) => {
        // definition of addOrganization resolver
        const Org = await Organizations.insertOne({ ...input });
        return Org;
    },
    updateOrganization: async (uid, { input }) => {
        // definition of addOrganization resolver
        const Org = await Organizations.findOneAndUpdate({ "_id": Types.ObjectId(uid) }, { ...input }, {});
        return Org;
    }
}