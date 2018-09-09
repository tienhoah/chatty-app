// server.js
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const WebSocket = require('ws');

const PORT = 3001;
const colors = ["Red", "Blue", "Dark", "Brown"];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};


// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Define WebSockets Broadcast server
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const userOnline = {
    type: "userCountChanged",
    userCount: wss.clients.size
  };

  const colorForUser = {
    type: "color",
    color: randomColor()
  }

  ws.send(JSON.stringify(colorForUser));

  wss.broadcast(JSON.stringify(userOnline));

  ws.on('message', function incoming(message) {
    const uid = uuid.v4();
    const messageFromClient = JSON.parse(message);

    if (messageFromClient.type === "postMessage") {
      const newMessage = {
        type    : "incomingMessage",
        id      : uid,
        username: messageFromClient.username,
        content : messageFromClient.content,
        color   : messageFromClient.color
      }
      wss.broadcast(JSON.stringify(newMessage));

    } else if (messageFromClient.type === "postNotification") {
      const newMessage = {
        type   : "incomingNotification",
        id     : uid,
        content: messageFromClient.content
      }
      wss.broadcast(JSON.stringify(newMessage));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
  });
});

