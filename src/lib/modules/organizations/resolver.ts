
// import inbuilt modules
// import custom modules
import Model from './model';

export default {
    Query: {
        organization: async (root, args, context, info) => {
            // definition of organizations resolver
            const Orgs = await Model.findOne({ uid: args.uid }, {});
            return Promise.resolve(Orgs);
        },
        organizations: async (root, args, context, info) => {
            // definition of organizations resolver
            const Orgs = await Model.find({}, {}, { ...args });
            // console.log("Query organizations: ", Orgs, args);
            return Orgs;
        },
    },
    Mutation: {
        addOrganization: async (parent, dataInput, context, info) => {
            // definition of organizations resolver
            const Org = await Model.insertOne(dataInput.input);
            // console.log("Query organizations: ", Orgs, args);
            return Org;
        }
    }
}