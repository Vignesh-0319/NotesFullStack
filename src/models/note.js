const mongoose = require('mongoose');

const Note = mongoose.model('Note', {
    note: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = Note;
