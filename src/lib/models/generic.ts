import { clone, merge } from 'lodash';

import { Helper } from './../../framework/utils';
import { Model } from './index';

export abstract class Generic {
    private data: any;
    protected model: any;
    protected schema: any;
    protected collectionName: string;
    protected baseModel;

    /**
     * Creates an instance of Generic.
     * @param {any} sequelize 
     * @memberof Generic
     */
    constructor(collectionName) {
        const DBInstance = Model.getDatabase()
        this.collectionName = collectionName;
        this.model = DBInstance.collection(this.collectionName);
    }

    /**
     * 
     * 
     * @param {*} body 
     * @returns 
     * @memberof Generic
     */
    setData(body: any) {
        this.data = body;
        return this;
    }

    /**
     * 
     * 
     * @param {string} key 
     * @returns {*} 
     * @memberof Generic
     */
    get(key: string): any {
        return this[key];
    }

    /**
     * 
     * 
     * @param {*} data 
     * @returns 
     * @memberof Generic
     */
    insert(data: any) {
        return this.model.insert(data);
    }

    /**
     * 
     * 
     * @param {*} query 
     * @param {*} options 
     * @memberof Generic
     */
    find(query: any = {}, options: any = {}) {
        return this.model.find(query, options).toArray()
    }


    /**
     * 
     * 
     * @param {*} query 
     * @param {*} options 
     * @memberof Generic
     */
    findOne(query: any = {}, options: any = {}) {
        return this.model.find(query, options).toArray()
    }

    /**
     * 
     * 
     * @memberof Generic
     */
    fetch() {

    }
}