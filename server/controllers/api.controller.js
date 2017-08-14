const express = require("express");
const router = express.Router();
const connection = require('../models/mongoose.connection');

function init(app) {
    app.use('/api', router);
    // Init the db
    connection.init();
}

router.get('/', function(req, res) {
    res.send('<h1>Api controller called</h1>');
});

module.exports = {
    init: init,
    router: router
};