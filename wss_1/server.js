/** Web Socket server for communication between the Controller and the Kobuki accessors. */

var app = require('express')();
var io = require('socket.io')(3000);

io.on('connection', function (socket) {
    console.log('New socket connected...');

    socket.on('message', function (msg) {
        console.log('Moving Kobuki to ' + msg + '...');
    });
});
