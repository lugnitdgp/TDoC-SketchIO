const {addUser}=require("./users");

module.exports=(io)=>{

function eventHandlers(socket){

console.log("server client connected",socket.id);
socket.on('user-name',(name)=>{
io.emit('user-name',name);
})
socket.on("disconnect",()=>{
    console.log("Client disconnected");
});
}


    return eventHandlers;

}

