const express = require("express");
const Notes = require('../models/notes.model');
const apiRouter = require('./api.controller').router;
const router = express.Router();

function init(...args) {
    apiRouter.use('/notes', router);
    initSocket(args[1]);
}

function initSocket(io) {
    io.on('connection', function(socket) {
        socket.emit('notes', Notes.readAll());
    });
}

router.get('/', function(req, res) {
     res.status(200).send(Notes.readAll());
});

module.exports = {
    init: init,
    router: router
};