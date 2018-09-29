// import inbuilt modules
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

// import custom modules
import { UserType } from './users/index';
import { PlanType, PlanResolver } from './plans/index';
import { OrganizationType, OrganizationResolver } from './organizations/index';

export const Types = mergeTypes([PlanType, OrganizationType]);

// creating object for all resolvers
// const ResolverObject = Object.create(mergeResolvers([PlanResolver, OrganizationResolver]));
const ResolverObject = mergeResolvers([PlanResolver, OrganizationResolver]);
export const Resolvers = ResolverObject;
// export const Resolvers = {
//     organizations: OrganizationResolver.organizations,
//     orgPlans: OrganizationResolver.orgPlans
// };
