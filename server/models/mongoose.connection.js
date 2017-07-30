const mongoose = require('mongoose');
const config = require('../config');
try {
    mongoose.connect(config.mongoHost + ':' + config.mongoPort + config.mongoEndpoint, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.info('Connected to mongo db');
    });
} catch(e) {
    console.error(e);
}

module.exports = mongoose;