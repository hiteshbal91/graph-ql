// import inbuilt modules
import * as Debug from 'debug';
// import custom modules
import GenericModel from './';

// model name for the mongoose object
const ModelName = "UserSession";

/**
 * UserSessions
 */
class UserSessions extends GenericModel {
    constructor() {
        super(ModelName, {}, {}, "user-sessions");
    }
}

const UserSessionModel = (): GenericModel => {
    return new UserSessions();
};

export default UserSessionModel();