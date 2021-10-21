const {addUser}=require('./users')

const event= 
(io)=>
{
   function eventhandler(socket){
    console.log("Hello Event triggered, a user logged in");
    console.log(socket.id); // logging the id of the socket.io object


    socket.on("user-name", (name)=>{
      
      console.log(name);
      io.emit("user-name", name);

    });

 


    socket.on('disconnect', function () {
      console.log('A user disconnected');
   });

  }

    return eventhandler;

  }

module.exports=event;
