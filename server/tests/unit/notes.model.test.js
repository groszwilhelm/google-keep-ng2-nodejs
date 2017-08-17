const connection = require('../../models/mongoose.connection');
const config = require('../../config');
const NoteSchema = require('../../models/notes.schema');
const NoteModel = require('../../models/notes.model');
const Note = NoteModel.Note;
const chai = require('chai');

chai.should();

describe('Notes model', () => {
    before(() => {
        connection.init('/test');
    });

    afterEach((done) => {
        NoteSchema.remove({}, () => {
            done();
        });
    });

    it('should have a create method', (done) => {
        NoteModel.should.have.property('add');
        done();
    });

    it('should have a read method', (done) => {
        NoteModel.should.have.property('read');
        done();
    });

    it('should have an update method');

    it('should have a delete method', (done) => {
        NoteModel.should.have.property('remove');
        done();
    });

    describe('Create method', () => {
        it('should return the created object', (done) => {
            const note = new Note(443, 'Some title', 'Description', 'blue');

            NoteModel.add(note)
                .then((res) => {
                    res.status.should.equal(200);
                    res.should.be.an('object');
                    res.should.have.all.keys(['status', 'data']);
                    res.data.should.be.an('object');
                    res.data.should.have.all.keys('id', 'title', 'description', 'color');
                    res.data.title.should.equal(note.title);
                    res.data.description.should.equal(note.description);
                    res.data.color.should.equal(note.color);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it('should throw an error if empty fields and send message to the client', (done) => {
            const note = new Note(443, 'Some title', '', '');

            NoteModel.add(note)
                .then((res) => {
                    res.status.should.equal(500);
                    res.should.be.an('object');
                    res.should.have.all.keys(['status', 'data']);
                    res.data.message.should.be.a('string').that.is.not.empty;
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe('Read method', () => {
        before((done) => {
            const noteData = new NoteSchema({ title: 'Note1', description: 'Description', color: 'Color' });
            noteData.save(() => {
                done();
            });
        });

        it('should return an array of notes', (done) => {
            NoteModel.read()
                .then((res) => {
                    const note = res.data[0];
                    res.status.should.equal(200);
                    res.should.be.an('object');
                    res.data.should.be.an('array');
                    res.should.have.all.keys(['status', 'data']);
                    note.title.should.be.a('string');
                    note.description.should.be.a('string');
                    note.color.should.be.a('string');
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it('should return an emty array if no data present', (done) => {
            NoteModel.read()
                .then((res) => {
                    res.status.should.equal(204);
                    res.should.be.an('object');
                    res.should.have.all.keys(['status', 'data']);
                    res.data.should.be.an('array').that.is.empty;
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe('Delete method', () => {
        let note;

        before((done) => {
            const noteData = new NoteSchema({ title: 'Note1', description: 'Description', color: 'Color' });
            noteData.save((err, doc) => {
                note = doc;
                done();
            });
        });

        it('should return the deleted object and send a message to the client', (done) => {
            NoteModel.remove(note._id)
                .then((res) => {
                    res.status.should.be.equal(200);
                    res.should.be.an('object');
                    res.should.have.all.keys(['status', 'data']);
                    res.data.should.be.an('object');
                    res.data.message.should.be.a('string').that.is.not.empty;
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});