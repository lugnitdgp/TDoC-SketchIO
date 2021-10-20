const { addUser } = require('./users')

module.exports = (io) => {
    function eventHandlers (socket) {

        console.log('A Client just got connected.');

        socket.on('user-name', (name) => {
            io.emit('user-name', name)
        })

        socket.on('disconnect', () => {
            console.log('Disconnected !!');
           })
    }
    return eventHandlers
}