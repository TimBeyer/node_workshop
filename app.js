var express = require('express');
var app = express();
var PORT = 3000;

app.use(express.static(__dirname + '/static'));

app.listen(PORT);

console.log("Server now listening on port", PORT);