const mongoose = require('./mongoose.connection');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    description: String,
    color: String
});

module.exports = NoteSchema;