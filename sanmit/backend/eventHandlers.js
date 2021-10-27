const { addUser } = require('./users');

module.exports = (io) => {
  function eventHandlers(socket) {
    console.log('A client got connected with socket-id ', socket.id);
    console.log(socket.client.conn.server.clientsCount + ' users connected');

    socket.on('join-room',(data) => {
      socket.join(data)
      console.log('User joined Room: ', data);
    })

    socket.on('send-message',(data) => {
      socket.to(data.room).emit('recv-msg',data.content);
    })

    socket.on('disconnect', () => {
      console.log('Client with socket-id ', socket.id, 'disconnected');
      console.log(socket.client.conn.server.clientsCount + ' users connected');
    });
  }
  return eventHandlers;
};
