(function () {
	var socket = io.connect('http://localhost:9001');

	$(function () {
		var noteTmpl = Handlebars.compile($('#note-row').html());
		
		_.each(['add', 'change', 'remove'], function (action) {
			socket.on(action, function (data) {
				$('#notes').prepend(noteTmpl(_.extend({action: action}, data)));
			});
			
		});
	});
}());
