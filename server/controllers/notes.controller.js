const express = require("express");
const Notes = require('../models/notes.model');
const apiRouter = require('./api.controller').router;
const router = express.Router();

function init() {
    apiRouter.use('/notes', router);
}

router.get('/', function(req, res) {
    res.status(200).send(Notes.readAll());
});

module.exports = {
    init: init,
    router: router
};