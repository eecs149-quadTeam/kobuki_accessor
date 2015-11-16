/** Runs a command line client for the Kobuki accessor. */

// Assuming 6x6 grid
var XY_PATTERN = /[1-6],[ ]*[1-6]/;
var SOCKET_URL = 'http://localhost';

var readline = require('readline');
var io_client = require('socket.io-client');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('When prompted, enter in x,y coordinates of the form x,y and in the range [1,6]. To exit, press ctrl+C or type "quit".');

var socket = io_client.connect('http://localhost:3000');

socket.on('connect', function () {
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