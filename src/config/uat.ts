export default {
    static: {
        url_prefix: "/assets",
        path: "./static",
        options: {
            immutable: true,
            maxAge: '7d'
        }
    }
}