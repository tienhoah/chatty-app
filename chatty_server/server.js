
// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const WebSocket = require('ws');


// console.log("uuid", uuid.v4());
// Set the port to 3001
let clients = [];
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  const userOnline = {
    type: "userCountChanged",
    userCount: wss.clients.size
  };
  wss.broadcast(JSON.stringify(userOnline));

  ws.on('message', function incoming(message) {
    const uid = uuid.v4();
    const messageReceived = JSON.parse(message);

    if (messageReceived.type === "postMessage") {
      const newMessage = {
        type: "incomingMessage",
        id: uid,
        user: messageReceived.user,
        content: messageReceived.content
      }
      wss.broadcast(JSON.stringify(newMessage));

    } else if (messageReceived.type === "postNotification") {
      const newMessage = {
        type: "incomingNotification",
        id: uid,
        content: messageReceived.content
      }
      wss.broadcast(JSON.stringify(newMessage));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
  });
});

