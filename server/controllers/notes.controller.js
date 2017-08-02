const express = require("express");
const Notes = require('../models/notes.model');
const apiRouter = require('./api.controller').router;
const router = express.Router({ mergeParams: true });
let socketIo;

function init(...args) {
    apiRouter.use('/notes', router);
    initSocket(args[1]);
}

function handleSuccess(res, status, data) {
    res.status(status).send(data);
    console.log('Data sent on success, endpoint: /notes ' + status + ' ' + JSON.stringify(data));
}

function handleError(res, status, data) {
    res.status(status).send(data);
    console.error('Data sent on error, endpoint: /notes ' + status + ' ' + JSON.stringify(data));
}

function initSocket(io) {
    socketIo = io;
    io.on('connection', function(socket) {
        socket.on('deleteNotes', function(noteId) {
            io.sockets.emit('deleteNotes', noteId);
        });
    });
}

function handleRequest(method, param, res) {
    if (Notes[method]) {
        Notes[method].call(Notes, param)
            .then(result => {
                filterResultStatus(res, result);
                if (method === 'add' && result.status === 200) {
                    socketEmitNewNote(result.data);
                }
            });
    } else {
        handleError(res, 500, { message: 'Server error!' });
        console.error('Method' + method + 'does not exist on Notes');
    }
}

function filterResultStatus(res, result) {
    switch(result.status) {
        case 200:
            handleSuccess(res, result.status, result.data);
            break;
        case 204:
            handleSuccess(res, result.status, result.data);
            break;
        case 400:
            handleError(res, result.status, result.data);
            break;
        case 500: 
            handleError(res, result.status, result.data);
    }
}

function socketEmitNewNote(note) {
    if (Object.keys(note).length > 0) {
        socketIo.sockets.emit('addNotes', note);
    }
}

router.post('/', function(req, res) {
    handleRequest('add', req.body, res);
});

router.get('/', function(req, res) {
    handleRequest('read', req.body, res);
});

router.delete('/:id', function(req, res) {
    handleRequest('remove', req.params.id, res);
});

module.exports = {
    init: init,
    router: router
};