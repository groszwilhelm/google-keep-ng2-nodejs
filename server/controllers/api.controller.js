const express = require("express");
const router = express.Router();

function init(app) {
    app.use('/api', router);
}

router.get('/', function(req, res) {
    res.send('<h1>Api controller called</h1>');
});

module.exports = {
    init: init,
    router: router
};