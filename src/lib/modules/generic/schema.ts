export default `
    scalar ISODate

    interface SysFields {
        created_at: String
        updated_at: ISODate
        created_by: String
        updated_by: String
        uid: String!
    }
`;