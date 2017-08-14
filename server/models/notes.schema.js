const mongoose = require('./mongoose.connection').mongoose;
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;