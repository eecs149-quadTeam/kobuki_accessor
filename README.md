# Kobuki Accessors

This repository will contain the Accessor for the Kobuki machines. For more information on Accessors, see the [project website](https://www.terraswarm.org/accessors/).

## Web Socket Server

To run the Web Socket server, first install the Node.js packages (assumes you have [Node.js](https://nodejs.org/en/) installed).

```
cd wss_1
npm install
```

Then, run the `server.js` file.

`node server.js`

## Command-line Client

To run the command-line client, first install the Node.js packages (assumes you have [Node.js](https://nodejs.org/en/) installed).

```
cd cl_client
npm install
```

Make sure the server is running before starting the client.

`node client.js`

You can send commands in the form `x,y` to standard input and they will be sent to the Web Socket server.
