var _ = require('underscore');
var http = require('http');


var basicOptions = {
    host: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

var makeRequest = function (options, data, success, error) {
    var req = http.request(_.extend(basicOptions, options), function (res) {
        var responseData = '';
        res.on('data', function (chunk) {
            //console.log("Received chunk");
            responseData += chunk;
        });
        res.on('end', function () {
            //console.log("Response was", responseData);
            success(res, responseData);
        });
    });

    console.log("Sending data ", data);
    req.write(data);
    req.end();
};

makeRequest({
    path: '/notes',
    method: 'GET'
}, "", function (res, data) {
    console.log("Response was ", data);
});

makeRequest({
    path: '/notes/c3',
    method: 'PUT'
}, JSON.stringify({
    title: "Changing a title"
}), function (res, data) {
    console.log("Received data", data);
});