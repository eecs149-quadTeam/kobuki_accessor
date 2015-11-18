/** Kobuki */

var leftWheelSpeed;
var rightWheelSpeed;

var currentX, currentY;
var currentDir;

var onNewLocation;

exports.setup = function() {
    extend('net/WebSocketClient');
    parameter('port', {
        type: 'int',
        value: 3000
    });

    // Expects location to be of the form: x,y
    input('location', {
        type: 'string',
        value: ''
    });

    output('location', {
        type: 'string',
        value: ''
    });
}

exports.initialize = function() {
    this.ssuper.initialize.apply(this);

    // Advertise which Kobuki and location
    var advertise = {
        id: '1',
        pos: '0,0'
    };

    onNewLocation = addInputHandler('location', newLocationHandler);

    exports.sendToWebSocket(advertise);
}

/** Returns array of [x, y] coords given a string of the form x,y */
function parseLocation(location) {
    return location.split(',').map(function (s) { return parseInt(s); });
}

/** Returns one of 0-7 (cardinal) for how to get to loc1 from loc2.
 *  loc2 should be +-1 x,y from loc1 and -1 if same location.*/
function getDirection(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    if (dx < 0) {
        if (dy < 0) return 7;
        else if (dy == 0) return 6;
        else return 5;
    }
    else if (dx == 0) {
        if (dy < 0) return 0;
        else if (dy == 0) return -1;
        else return 4;
    }
    else {
        if (dy < 0) return 1;
        else if (dy == 0) return 2;
        else return 3;
    }
}

/** Returns the number of clockwise, 45 degree turns required to go from dir1
 *  to dir2. Returns values from 0-7. */
function getNumTurns(dir1, dir2) {
    return (dir2 - dir1 + 8) % 8;
}

function isDiagonal(dir) {
    return dir % 2 == 1;
}

function newLocationHandler() {
    var location = get('location');
    var coords = parseLocation(location);
    var dir = getDirection(currentX, currentY, x, y);
    var numTurns = getNumTurns(currentDir, dir);
    var distance = isDiagonal(dir) ? 1.414 : 1.0;

    // send numTurns
    exports.sendToWebSocket(numTurns);

    // send distance
    exports.sendToWebSocket(distance);
}