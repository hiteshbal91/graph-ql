// import inbuilt modules
import * as Debug from 'debug';
// import custom modules
import GenericModel from './model';

const ModelName = "Users";
const Schema = {
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[_a-zA-Z0-9\-+]+(\.[_a-zA-Z0-9\-+]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[A-Za-z]{2,})$/
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 15,
        unique: true,
        lowercase: true
    },
    company: {
        type: String,
        required: false,
        trim: true,
        maxlength: 50
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: false,
        trim: true
    },
    mobile_number: {
        type: Number,
        required: false,
        trim: true,
        minlength: 10,
        maxlength: 20
    },
    country_code: {
        type: Number,
        required: false,
        trim: true
    },
    tfa_status: {
        type: Boolean
    },
    authy_id: {
        type: String,
        required: false,
        trim: true
    },
    org_uid: {
        type: String,
        multiple: true,
        required: true,
        default: []
    },
    shared_org_uid: {
        type: String,
        multiple: true,
        required: true,
        default: []
    },
    authtoken: {
        type: String,
        required: true,
        default: () => {
            return "";
        }
    }
};

class Users extends GenericModel {
    constructor() {
        super(ModelName, Schema);
    }
}
export default (): GenericModel => {
    return new Users();
};