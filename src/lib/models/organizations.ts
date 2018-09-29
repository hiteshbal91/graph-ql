// import inbuilt modules
import * as Debug from 'debug';
// import custom modules
import GenericModel from './model';

const ModelName = "Organizations";
const Schema = {
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        required: false,
        unique: false,
        maxlength: 160,
        trim: true
    },
    owner_uid: {
        type: String,
        // required: true
    },
    plan_id: {
        type: String,
        required: true,
        default: "free_trial"
    },
    expires_on: {
        type: Date,
        // required: true,
        validate: [
            {
                validator: (value) => {
                    return (value > new Date());
                },
                msg: "ExpiresOn should be greater than the current time"
            }
        ]
    },
    is_over_usage_allowed: {
        type: Boolean,
        required: true,
        default: true
    }
};

class Organizations extends GenericModel {
    constructor() {
        super(ModelName, Schema);
        // Organizations.addPreHooks();
    }
}
export default (): GenericModel => {
    return new Organizations();
};