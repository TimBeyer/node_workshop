var express = require('express');
var app = express();
var server = require('http').Server(app);

var _ = require('underscore');
var Note = require('./models/Note.js').Note;
var Notes = require('./collections/Notes.js').Notes;

var PORT = 3000;
var SOCKET_PORT = 9001;

var io = require('socket.io').listen(SOCKET_PORT);
console.log("Socket listening on port", SOCKET_PORT);

var notes = new Notes();

// Set up websocket server
io.sockets.on('connection', function (socket) {
    console.log("WebsocketClient connected");
});

_.each(['add', 'remove', 'change'], function (type) {
    notes.on(type, function (model) {
        console.log(type, model.toJSON());
        io.sockets.emit(type, model.toJSON());
    });
});

app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());

var modelOr404 = function (model, res) {
    if (typeof model == "undefined"){
        res.send(404, "model not found");
    }
    else {
        res.json(model.toJSON());
    }
};

app.get('/notes', function (req, res){
    var notesJSON = notes.toJSON();
    res.json(notesJSON);
});

app.post('/notes', function (req, res) {
    var note = new Note(req.body);
    notes.add(note);
    res.json(note.toJSON());
});

app.get('/notes/:id', function (req, res) {
    var note = notes.get(req.params.id);
    modelOr404(note, res);
});

app.put('/notes/:id', function (req, res) {
    var note = notes.get(req.params.id);
    if (typeof note == "undefined"){
        res.send(404, "note not found");
    }
    else {
        note.set(req.body);
        res.json(note.toJSON());
    }
});

app.delete('/notes/:id', function (req, res) {
    var note = notes.get(req.params.id);
    if (typeof note == "undefined"){
        res.send(404, "note not found");
    }
    else {
        notes.remove(note);
        res.json(note.toJSON());
    }
});


app.listen(PORT);

console.log("Server now listening on port", PORT);