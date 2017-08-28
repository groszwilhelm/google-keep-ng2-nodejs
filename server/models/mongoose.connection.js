const mongoose = require('mongoose');
const config = require('../config');

/**
 * Set an endpoint for testing in case of running tests
 */
function init(testEndpoint) {
    let endpoint = testEndpoint || config.mongoEndpoint;
    mongoose.connect(config.mongoHost + ':' + config.mongoPort + endpoint);
    mongoose.Promise = Promise;
}

module.exports = {
    init,
    mongoose
};