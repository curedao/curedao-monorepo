const urlHelper = require("./urlHelper");
let credentials = {
    google: {
        // We use this for mobile apps
        clientId: process.env.CONNECTOR_GOOGLE_CLIENT_ID || "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",
        clientSecret: process.env.CONNECTOR_GOOGLE_CLIENT_SECRET || "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
        scopes: ['email', 'profile']
    },
    quantimodo: {
        // We use this for mobile apps
        clientId: process.env.CONNECTOR_QUANTIMODO_CLIENT_ID || 'oauth_test_client',
        clientSecret: process.env.CONNECTOR_QUANTIMODO_CLIENT_SECRET || 'YJDffKcoDLGYjMujyOclx0jarDcw3xnt',
    },
    github: {
        // We use this for mobile apps
        clientId: process.env.CONNECTOR_GITHUB_CLIENT_ID || "00e841f10f288363cd3786b1b1f538f05cfdbda2",
        clientSecret: process.env.CONNECTOR_GITHUB_CLIENT_SECRET || "8a9152860ce869b64c44",
        scopes: ['user:email', 'read:user', 'repo']
    },
    discord: {
        clientId: process.env.CONNECTOR_DISCORD_CLIENT_ID || "4398792-907871294886928395",
        clientSecret: process.env.CONNECTOR_DISCORD_CLIENT_SECRET || "His4yXGEovVp5TZkZhEAt0ZXGh8uOVDm",
    },
    getScopes(serviceName){
        let scopes = this[serviceName].scopes;
        return scopes;
    }
};
credentials.find = function (name) {
    return {
        clientID:     credentials[name].clientId,
        clientSecret:  credentials[name].clientSecret,
        callbackURL: `${urlHelper.websiteDomain}/auth/${name}/callback`,
        passReqToCallback: true
    }
}
module.exports = credentials
