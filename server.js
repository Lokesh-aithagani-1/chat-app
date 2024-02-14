const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for incoming messages from the client
  socket.on('message', (data) => {
    const message = {
      user: data.user,
      content: data.content,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Cleanup socket connection when a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
