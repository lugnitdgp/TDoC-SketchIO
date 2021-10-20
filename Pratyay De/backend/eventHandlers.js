const { addUser } = require('./users')

module.exports = (io) => {
    function eventHandlers (socket) {
        /*Handle various events here*/
        
        console.log("Client got connected !");

        socket.on('user-name', (name) => {
            // console.log(name);
            io.emit('user-name',name)
        })

        socket.on('connect',()=>{
            console.log('Server connected !');
        });

        socket.on('disconnect',()=>{
            console.log('Client disconnected :<');
        });

    }
    return eventHandlers
}