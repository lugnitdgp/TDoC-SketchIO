const {addUser } = require('./users')

module.exports = (io) => {
    function eventHandlers (socket){
        console.log('A client just got Connected !!');

        socket.on('user-name', (name) => {
           io.emit('user-name', name)
        })

        socket.on('disconnect', ()=>{
            console.log('Client disconnected :(');

        })
    }

    return eventHandlers
}