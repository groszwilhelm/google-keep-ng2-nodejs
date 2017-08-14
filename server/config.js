const env = process.env;
const config = {
    root: __dirname,
    port: 3000,
    mongoHost: env.MONGO_HOST || 'localhost',
    mongoPort: env.MONGO_PORT || '27017',
    mongoEndpoint: env.MONGO_ENDPOINT || '/google-keep'
};

module.exports = config;