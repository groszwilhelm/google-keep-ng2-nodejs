const mongoose = require('mongoose');
const config = require('../config');

/**
 * Set an endpoint for testing in case of running tests
 */
function init(testEndpoint) {
    mongoose.connect(config.mongoHost + ':' + config.mongoPort + (testEndpoint || config.mongoEndpoint));
}

module.exports = {
    init,
    mongoose
};