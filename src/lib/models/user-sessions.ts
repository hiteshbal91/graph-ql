// import inbuilt modules
import * as Debug from 'debug';
// import custom modules
import GenericModel from './model';

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
export default (): GenericModel => {
    return new UserSessions();
};