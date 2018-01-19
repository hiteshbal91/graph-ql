import { inspect as Inspect } from 'util';

export class Logger {
    private static options: any = {
        showHidden: true,
        colors: true
    };

    constructor() { }

    static log(object) {
        console.log(Inspect(object, this.options));
    }

    static error(object) {
        console.error(Inspect(object, this.options));
    }
}