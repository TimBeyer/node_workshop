var express = require('express');
var app = express();
var PORT = 3000;

app.use(express.static(__dirname + '/static'));

app.get('/notes', function (req, res){
    // respond with collection of notes
    console.log('/notes');
    res.json([
        { a: 'list' },
        { of: 'notes'}
    ]);
});

app.post('/notes', function (req, res) {
    // Create a new note and respond with it
});

app.get('/notes/:id', function (req, res) {
    // respond with a specific node
});

app.put('/notes/:id', function (req, res) {
    // update a note with an id and respond with it
});

app.delete('/notes/:id', function (req, res) {
    // delete a note with an ID and respond with it
});


app.listen(PORT);

console.log("Server now listening on port", PORT);