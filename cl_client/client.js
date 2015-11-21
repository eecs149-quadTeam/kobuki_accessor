/** Runs a command line client for the Kobuki accessor. */

// Assuming 6x6 grid
var XY_PATTERN = /[1-6],[ ]*[1-6]/;
var SOCKET_URL = 'ws://localhost:5000';

var readline = require('readline');
var WebSocket = require('ws');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('When prompted, enter in x,y coordinates of the form x,y and in the range [1,6]. To exit, press ctrl+C or type "quit".');

var socket = new WebSocket(SOCKET_URL);

socket.on('open', function () {
    console.log('Connected to socket at ' + SOCKET_URL + '.');
    console.log('Where do you want to move the Kobuki?');

    rl.on('line', function (line) {
        if (line == 'quit') process.exit(0);

        if (XY_PATTERN.test(line)) {
            console.log('> Moving Kobuki to ' + line);
            socket.send(line);
        } else {
            console.log('Invalid coordinates. Coordinates must be of the form x,y and in the range [1,6]');
        }
    });
});

socket.on('message', function (msg) {
    console.log('Received message from socket: ' + msg);
});