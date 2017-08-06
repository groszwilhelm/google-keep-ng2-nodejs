const mongoose = require('./mongoose.connection');
const NoteModel = require('./notes.schema');

const Note = function(id, title, description, color) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.color = color;
}

function read() {
    return new Promise(function(resolve, reject) {
        try {
            NoteModel.find(function(err, notes) {
                if (err) {
                    resolve({ status: 500, data: { message: err } })
                } else {
                    if (!notes) {
                        resolve({ status: 204, data: {} });
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

function create(data) {
    const note = new Note(data.id, data.title, data.description, data.color);

    return new Promise(function(resolve, reject) {
        try {
            delete note.id;
            const noteData = new NoteModel(note);

            noteData.save(function(err, doc) {
                if (err) {
                    console.error(JSON.stringify(err));
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

function remove(id) {
    return new Promise(function(resolve, reject) {
        try {
            NoteModel.findByIdAndRemove(id, function(err) {
                if (err) {
                    resolve({ status: 500, data: { message: err } });
                } else {
                    resolve({ status: 200, data: { message: 'Note was removed' } });
                }
            });
        } catch(e) {
            resolve({ status: 500, data: { message: e } });
        }
    });
}

module.exports = {
    read: read,
    add: create,
    remove: remove
}