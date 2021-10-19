const {addUser, users} = require('./users')

module.exports = (io) => {
    let user_no = 0;
    function eventhandlers(socket){
        console.log('Client connected!');

        user_no++;
        console.log(`${user_no} users connected`);

        socket.on('user-name', (name)=>{
            addUser({'id': socket.id, 'name': name});
            io.emit('user-name', name);
            io.emit('all-users', users);
        })

        socket.on('disconnect', ()=>{
            console.log('Client disconnected!');

            user_no--;
            console.log(`${user_no} users connected`);
        })
    }
    return eventhandlers;
}