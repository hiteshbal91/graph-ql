// import inbuilt modules
import * as Debug from 'debug';
import { merge } from 'lodash';
import { Schema as ModelSchema, model, SchemaOptions, Document, HookSyncCallback } from 'mongoose';
// import custom modules
import DefaultOptions from './model-options';
import { PreSaveHooks } from './hooks';

export default class GenericModel {
    private schema: ModelSchema = null;
    private plainSchema: Object = null;
    private options: SchemaOptions = null;
    private model: any = null;
    private collectionName: string = "";
    private modelName: string = "";
    protected preSaveHooks: HookSyncCallback<any>[] = PreSaveHooks;
    protected preUpdateHooks: HookSyncCallback<any>[] = [];
    protected preDeleteHooks: HookSyncCallback<any>[] = [];
    protected postSaveHooks: HookSyncCallback<any>[] = [];
    protected postUpdateHooks: HookSyncCallback<any>[] = [];
    protected postDeleteHooks: HookSyncCallback<any>[] = [];

    constructor(modelName: string, schema: any, options?: SchemaOptions, collectionName?: string) {
        // set the plain schema
        this.plainSchema = schema;
        // set options
        this.options = options;
        // set modelName
        this.modelName = modelName;
        // set collectionName
        this.collectionName = collectionName || this.modelName.toLowerCase();
        // registering schema
        this.schema = new ModelSchema(schema, merge(options || {}, DefaultOptions));
        // registering model
        this.model = model(modelName, this.schema);
        // loading all hooks
    }

    protected addPreSaveHooks(fn): void {
        this.preSaveHooks.push(fn);
    }

    protected setPreSaveHooks(fns): void {
        this.preSaveHooks = fns;
    }

    protected getPreSaveHooks(): any {
        return this.preSaveHooks;
    }

    /**
     * findOne document from specified collection.
     * @param query   Query to filter document
     * @param projection Projection of MongosseQuery Model
     * @param options Options of MongosseQuery Model
     * @return Promise
     */
    async findOne(query: Object, projection?: Object, options?: Object): Promise<any> {
        return this.model.findOne(query, projection || { _id: 0 }, options);
    }

    /**
     * find documents from specified collection.
     * @param query   Query to filter documents
     * @param projection Projection of MongosseQuery Model
     * @param options Options of MongosseQuery Model
     * @return Promise
     */
    async find(query: Object, projection?: Object, options?: Object): Promise<any> {
        return this.model.find(query, projection || { _id: 0 }, options);
    }

    /**
     * insertOne is used to create new document object in collection.
     * @param document Document to be saved in collection. 
     * @return Promise
     */
    async insertOne(document: Object) {
        const PreHooks = this.getPreSaveHooks();
        console.log("Pre Hooks : ");
        this.schema.pre('save', PreHooks[0]);
        const ObjectDocument = await this.model.create(document);
        console.log("ObjectDocument : ", ObjectDocument);
        return Promise.resolve(ObjectDocument);
    }

    /**
     * findOneAndUpdate is used to manintain concurrency of writing data to document.
     * @param query   Query to filter documents
     * @param data    Data to update in document
     * @param options Options of MongosseQuery Model
     * @return Promise
     */
    async findOneAndUpdate(query, data, options): Promise<any> {
        return this.model.findOneAndUpdate(query, data, options);
    }
}