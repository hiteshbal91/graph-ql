export default {
    database: {
        name: "graph-ql",
        host: "localhost",
        port: 27017,
        options: {
            poolSize: 5
        }
    },
    static: {
        url_prefix: "/assets",
        path: "./static",
        options: {
        }
    }
}