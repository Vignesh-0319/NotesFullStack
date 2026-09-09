const express = require('express');
require('./db/mongoose');
const Note = require('./models/note');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// 1. CREATE: Add a new note
app.post('/notes', async (req, res) => {
    const note = new Note(req.body);
    try {
        await note.save();
        res.status(201).send(note);
    } catch (e) {
        res.status(400).send(e);
    }
});

// 2. READ: Fetch all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.send(notes);
    } catch (e) {
        res.status(500).send();
    }
});

// 3. UPDATE: Update a note by ID
app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (e) {
        res.status(400).send(e);
    }
});

// 4. DELETE: Remove a note by ID
app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
});

// Start Server
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
