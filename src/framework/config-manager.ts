// import inbuilt modules
import { split, reduce, isUndefined } from 'lodash';

// import custom modules
import DefaultConfig from './../config/default';

export default class ConfigManager {

    constructor() {

    }

    static get(key: string): any {
        return split(key, '.').reduce((previous, current) => {
            if (!isUndefined(previous)) {
                return previous[current];
            }
        }, DefaultConfig);
    }
}