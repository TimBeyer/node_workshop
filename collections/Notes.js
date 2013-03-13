var _ = require('underscore');
var Backbone = require('backbone');
var Note = require('../models/Note.js').Note;

var Notes = Backbone.Collection.extend({
	model: Note
});

_.extend(exports,{
	Notes: Notes
});