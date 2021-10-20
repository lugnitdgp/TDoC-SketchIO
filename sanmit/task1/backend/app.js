const { createServer } = require('http');
const app = require('express');
const server = createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const eventHandlers = require('./eventHandlers')(io);

io.on('connection', eventHandlers); // eventHandlers is a callback function over

const PORT = 8000;
server.listen(PORT, () => {
  console.log('server listening on port:', PORT);
});

