export default {
    database: {
        // database: "uspost-tracking",
        // host: "localhost",
        // dialect: "mysql",
        // username: "root",
        // password: "root",
        // operatorsAliases: false,
        name: 'typescriptdb',
        // authentication: {
        //     "username": "hdbadmin",
        //     "password": "root",
        // },
        "servers": [{
            "host": "localhost",
            "port": 27017
        }, {
            "host": "localhost",
            "port": 27018
        }, {
            "host": "localhost",
            "port": 27019
        }],
        "options": {
            "poolSize": 0,
            "readPreference": "primaryPreferred",
            "w": "majority",
            "wtimeout": 2000,
            "replicaSet": "hdbrs",
            "useNewUrlParser": true
        }
    }
}