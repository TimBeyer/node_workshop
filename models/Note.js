var _ = require('underscore');
var Backbone = require('backbone');

var Note = Backbone.Model.extend({
    toJSON: function() {
        return _.extend(Backbone.Model.prototype.toJSON.apply(this, arguments), { cid: this.cid });
    }
});

_.extend(exports,{
    Note: Note
});