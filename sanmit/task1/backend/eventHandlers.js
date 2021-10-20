const { addUser } = require('./users');

module.exports = (io) => {
  function eventHandlers(socket) {
    console.log('A client got connected with socket-id ', socket.id);
    console.log(socket.client.conn.server.clientsCount + ' users connected');

    socket.on('user-name', (name) => {
      io.emit('user-name',name);
    });

    socket.on('disconnect', () => {
      console.log('Client with socket-id ', socket.id, 'disconnected');
      console.log(socket.client.conn.server.clientsCount + ' users connected');
    });
  }
  return eventHandlers;
};
