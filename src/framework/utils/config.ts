import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join, isAbsolute } from 'path';
import { merge } from 'lodash';

const ENVIRONMENT = process.env.NODE_ENV || "localdev";
const ROOT_PATH = process.env.ROOT_PATH || join(process.cwd(), "dist");
const CONFIG_PATH = join(process.cwd(), "dist", "config");
const DEFAULT_CONFIG_PATH = join(ROOT_PATH, "default.js");

import defaultConfig from './../../config/default'/*DEFAULT_CONFIG_PATH*/;

/**
 * Config class provides way for fetching and setting configuration. 
 * @class Configuration
 */
export default class Configuration {
    // rootPath to determine the directory of configuration
    private rootPath: string;
    static instance = null;
    private config: any = {
        environment: ENVIRONMENT.toLowerCase()
    };

    /**
     * @static
     * @returns 
     * @memberof Configuration
     */
    public static instantiate() {
        if (this.instance === null)
            this.instance = new Configuration();

        return this.instance;
    }

    /**
     * Creates an instance of Configuration.
     * @memberof Configuration
     */
    private constructor() {
        this.rootPath = ROOT_PATH;
        this.load();
    }

    /**
     * Load all configurations based on the environment and default parameter.
     * @memberof Configuration
     */
    public load() {
        try {
            merge(this.config, defaultConfig);
            const envConfigPath = join(this.rootPath, "config", ENVIRONMENT + ".js");
            if (existsSync(envConfigPath) === true) {
                const envConfig = require(envConfigPath) || {};
                merge(this.config, envConfig.default || {});
            }

            // update static path 
            if (this.config.static) {
                this.config.static.url_prefix = this.config.static.url_prefix || "/";
                this.config.static.path = (this.config.static.path && isAbsolute(this.config.static.path) === true) ? this.config.static.path : join(this.rootPath, this.config.static.path);
                this.config.static.options = this.config.static.options || {};
            }
        } catch (error) {
            console.log("Config load error:", error.message, error.stack);
        }
    }

    /**
     * Get value from configuration.
     * @param {string} key - key to access from configuration.
     * @memberof Configuration
     */
    get(key: string) {
        const keys = key.split(".");
        if (keys.length === 1)
            return this.config[key];

        return keys.reduce((previousValue, currentValue) => {
            return previousValue[currentValue];
        }, this.config);
    }
}