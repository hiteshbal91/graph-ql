import { MongoClient, Logger as DBLogger, ObjectID as ObjectIDInstance } from 'mongodb';
import { isUndefined, isEmpty, merge, cloneDeep } from 'lodash';

import { Users as UsersModel } from "./users";
import { Posts as PostsModel } from "./posts";
import { Config, Logger } from "./../../framework/utils";

let database = null;

export class Model {
    private static database = null;
    private client = null;
    private models = {};

    connect() {
        const DBConfig = Config.get('database');
        return MongoClient.connect(`mongodb://${DBConfig.host}:${DBConfig.port}/${DBConfig.name}`, Config.get('database.options'))
            .then(Client => {
                this.client = Client;
                database = Client.db(DBConfig.name);
                // DBLogger.setLevel('debug');
                this.loadModels();
                return Promise.resolve();
            });
    }

    loadModels() {
        this.models = {
            users: new UsersModel(),
            posts: new PostsModel()
        }
    }

    close() {
        this.client.close();
    }

    static getDatabase() {
        return database;
    }

    getModel(modelName: string) {
        return this.models[modelName];
    }
}

export const ObjectID = ObjectIDInstance;

export default new Model();