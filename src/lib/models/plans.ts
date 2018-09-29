// import inbuilt modules
import * as Debug from 'debug';
import { Schema as ModelSchema } from 'mongoose';
// import custom modules
import GenericModel from './model';
import { UIDRegExp } from './../../framework/constants';

const ModelName = "Plans";
const Schema = {
    plan_id: {
        type: String,
        lowercase: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
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
    features: {
        type: ModelSchema.Types.Mixed
    }
};

const assignPlan = function (next) {
    // based on the name assignment of the plan id
    this.plan_id = this.name.trim().toLowerCase().replace(UIDRegExp, '_');
    return next();
}

class Plans extends GenericModel {
    constructor() {
        super(ModelName, Schema);
        this.setPreSaveHooks([assignPlan]);
    }
}
export default (): GenericModel => {
    return new Plans();
};