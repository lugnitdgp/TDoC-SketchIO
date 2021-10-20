const {users, addUser, removeUser} = require('./users')

module.exports = (io) => {
    function eventhandlers(socket){
        console.log('Client connected!');

        socket.on('user-name', (name)=>{
            addUser({'id': socket.id, 'name': name});
            
            io.emit('user-name', name);
            io.emit('all-users', users);

            console.log(`${users.length} users connected`);
        })

        socket.on('disconnect', ()=>{
            console.log('Client disconnected!');

            removeUser(socket.id);
            console.log(`${users.length} users connected`);
        })
    }
    return eventhandlers;
}