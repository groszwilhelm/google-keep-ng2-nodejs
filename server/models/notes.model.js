'use strict';

const NoteSchema = require('./notes.schema');

const Note = function(id, title, description, color) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.color = color;
}

function read() {
    return new Promise(function(resolve, reject) {
        try {
            NoteSchema.find(function(err, notes) {
                if (err) {
                    resolve({ status: 500, data: { message: err } })
                } else {
                    if (notes.length === 0) {
                        resolve({ status: 204, data: [] });
                    } else {
                        let notesArray = [];
                        notes.forEach(function(note) {
                            notesArray.push(new Note(note._id, note.title, note.description, note.color));
                        });
                        resolve({ status: 200, data: notesArray });
                    }
                }
            });
        } catch(e) {
            resolve({ status: 500, data: { message: e } })
        }
    });
}

function create(note) {
    // const note = new Note(note.id, note.title, note.description, note.color);

    return new Promise(function(resolve, reject) {
        try {
            delete note.id;
            const noteData = new NoteSchema(note);

            noteData.save(function(err, doc) {
                if (err) {
                    resolve({ status: 500, data: { message: 'All fields must be filled in' } });
                } else {
                    resolve({ status: 200, data: new Note(doc._id, doc.title, doc.description, doc.color) });
                }
            });
        } catch(e) {
            resolve({ status: 500, data: { message: e } });
        }
    });
}

function find(term) {
    return new Promise(function(resolve, reject) {
        try{
            NoteSchema.find({ 'title': { '$regex': term } }, function(err, docs) {
                if (err) {
                    resolve({ status: 500, data: { message: 'Some internal server error' } });
                    console.warn(err);
                } else {
                    let notesArray = [];
                    docs.forEach((note) => {
                        notesArray.push(new Note(note._id, note.title, note.description, note.color));
                    })
                    resolve({ status: 200, data: notesArray })
                    console.warn(docs);
                }
            });
        } catch(e) {
            resolve({ status: 500, data: { message: e } });
        }
    })
}

function update(note) {
    return new Promise(function(resolve, reject) {
        try {
            NoteSchema.findByIdAndUpdate(note.id, note, function(err, doc) {
                if (err) {
                    resolve({ status: 500, data: { message: err } });
                } else {
                    resolve({ status: 200, data: { note: note, message: 'Note was updated' } });
                }
            });
        } catch(e) {
            resolve({ status: 500, data: { message: e } });
        }
    });
}

function remove(id) {
    return new Promise(function(resolve, reject) {
        try {
            NoteSchema.findByIdAndRemove(id, function(err, doc) {
                if (err) {
                    resolve({ status: 500, data: { message: err } });
                } else {
                    resolve({ status: 200, data: { note: new Note(doc._id, doc.title, doc.description, doc.color), message: 'Note was removed' } });
                }
            });
        } catch(e) {
            resolve({ status: 500, data: { message: e } });
        }
    });
}

module.exports = {
    Note: Note,
    add: create,
    read: read,
    findByTerm: find,
    update: update,
    remove: remove
}