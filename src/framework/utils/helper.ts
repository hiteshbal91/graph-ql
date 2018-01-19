import * as Crypto from 'crypto';

/**
 * 
 * 
 * @export
 * @class Helper
 */
export class Helper {
    /**
     * @param  {number=15} length
     */
    static generateUID(length: number = 15) {
        return Crypto.randomBytes(length).toString('hex');
    }

    /**
     * 
     * 
     * @static
     * @param {string} input 
     * @returns 
     * @memberof Helper
     */
    static MD5(input: string) {
        return Crypto.createHash('md5').update(input).digest('hex');
    }

    static executePromise(promise, next) {
        return promise
            .then((result) => {
                return next(null, result);
            }).catch((err) => {
                return next(err);
            });
    }

    static execSequence(promises) {
        return new Promise((resolve, reject) => {
            let results = [];
            if (promises.length === 0) return reject("Promises array should not be empty.");
            let counter = 0;
            const NextFunction = function (err, result) {
                if (err) return reject(err);
                if (counter >= promises.length - 1) {
                    return resolve(results);
                } else {
                    counter++;
                    results.push(result);
                    Helper.executePromise(promises[counter], NextFunction);
                }
            };
            Helper.executePromise(promises[counter], NextFunction);
        });
    }
}