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

function create(data) {
    const note = new Note(data.id, data.title, data.description, data.color);

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
    read: read,
    add: create,
    remove: remove
}