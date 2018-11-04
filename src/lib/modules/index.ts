// import inbuilt modules
// import custom modules
import { UserType } from './users/index';
import { GenericType, GenericResolver } from './generic';
import { PlanType, PlanResolver } from './plans';
import { OrganizationType, OrganizationResolver } from './organizations';

export const Types = [GenericType, PlanType, OrganizationType];

// creating object for all resolvers
export const Resolvers = {
    ...GenericResolver,
    SysFields: {
        __resolveType(obj, context, info) {
            return obj.name;
        }
    },
    ...OrganizationResolver,
    ...PlanResolver
};