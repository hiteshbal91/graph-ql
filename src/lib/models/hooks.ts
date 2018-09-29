// import inbuilt modules
import * as Debug from 'debug';
import { merge } from 'lodash';
// import custom modules

export const PreSaveHooks = [
    function uidAssignment(next): void {
        // this is refered as document        
        return next();
    }
];
