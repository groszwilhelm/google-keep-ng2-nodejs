const mongoose = require('./mongoose.connection');
const NoteSchema = require('./notes.schema');

const Note = function(id, title, description, color) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.color = color;
}

const NoteModel = mongoose.model('Note', NoteSchema);

function read() {
    return new Promise(function(resolve, reject) {
        try {
            NoteModel.find()
                .then(notes => {
                    let notesArray = [];
                    if (notes) {
                        notes.forEach(function(note) {
                            notesArray.push(new Note(note._id, note.title, note.description, note.color));
                        });
                        resolve({ status: 200, data: notesArray });
                    } else {
                        resolve({ status: 204, data: {} });
                    }
                });
        } catch (e) {
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

            noteData.save(function(err, row) {
                if (err) {
                    resolve({ status: 500, data: { message: err } });
                } else {
                    resolve({ status: 200, data: new Note(row._id, row.title, row.description, row.color) });
                }
            });
        } catch (e) {
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
        } catch (e) {
            resolve({ status: 500, data: { message: e } });
        }
    });
}

module.exports = {
    read: read,
    add: create,
    remove: remove
}