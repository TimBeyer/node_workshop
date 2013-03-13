var express = require('express');
var app = express();
var _ = require('underscore');
var Note = require('./models/Note.js').Note;
var Notes = require('./collections/Notes.js').Notes;

var PORT = 3000;

var notes = new Notes();

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());

app.get('/notes', function (req, res){
    var notesJSON = notes.toJSON();
    res.json(notesJSON);
});

app.post('/notes', function (req, res) {
    var note = new Note(req.body);
    notes.add(note);
    // Small hack to include the cid
    // Backbone expects us to save models to the server which then
    // returns the object with its correct ID
    // We have nowhere to persist to, so we just use the cid
    res.json(_.extend(note.toJSON(), { cid: note.cid }));
});

app.get('/notes/:id', function (req, res) {
    var note = notes.get(req.params.id);
    res.json(note.toJSON());
});

app.put('/notes/:id', function (req, res) {
    // update a note with an id and respond with it
});

app.delete('/notes/:id', function (req, res) {
    // delete a note with an ID and respond with it
});


app.listen(PORT);

console.log("Server now listening on port", PORT);

var newNote = new Note({ 'title': 'something'});
console.log("Created Note ", newNote.toJSON());

notes.add(newNote);
console.log("Added new note to notes collection", notes.toJSON());