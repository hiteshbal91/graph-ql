// import inbuilt modules
import * as Debug from 'debug';
import { isArray } from 'lodash';
import { connect, Mongoose, ConnectionOptions } from 'mongoose';
// import custom modules

const DBDebug = Debug('API:Database');

interface Authentication {
    username: string,
    password: string;
};

interface Server {
    host: string,
    port?: number;
};

interface ConnectionObject {
    name: string, // database name
    authentication: Authentication, // authentication details 
    servers: Server[],
    options?: ConnectionOptions
}

class Connection {
    private database: Mongoose = null;
    private config: ConnectionObject = null;

    constructor(config: ConnectionObject) {
        this.config = config;
    }

    getConnectionParameter(): string {
        let url: string = '';
        if (isArray(this.config.servers)) {
            const Servers: string[] = this.config.servers.map(server => {
                return `${server.host}:${server.port}`;
            });

            let authentication = '';
            if (this.config.authentication && this.config.authentication.username && this.config.authentication.password)
                authentication = `${encodeURIComponent(this.config.authentication.username)}:${encodeURIComponent(this.config.authentication.password)}@`;

            url = `mongodb://${authentication}${Servers.join(',')}/${this.config.name}`;
            DBDebug('DBConnectionUrl string %s', url);
        }
        return url;
    }

    async init(): Promise<Mongoose> {
        this.database = await connect(this.getConnectionParameter(), this.config.options);
        return Promise.resolve(this.database);
    }
}

export default (config: ConnectionObject) => {
    return new Connection(config);
};