const app = require("express")();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, { cors: "*" });

const PORT = 5000;
let answer_key;
io.on("connection", (socket) => {
  console.log(`Client with ID ${socket.id} is now connected with backend`);

  socket.on("message", (msg_obj) => {
    let text=msg_obj.msg;
    let user_name=msg_obj.name;
    if(text===answer_key)
    {
      msg_obj.name="SKETCHIO_BOT";
      msg_obj.msg=`HURRAH!!  ${user_name} has guessed the right word which is ${answer_key}`;
      text="";
      user_name="";
    }
    io.emit("chat", msg_obj);
  });


  socket.on('ans', (word)=>{
    answer_key=word;
  });

  socket.on("disconnect", () => { 
    console.log(`Client with ID : ${socket.id} is disconnected with backend`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server has started listening to  PORT:${PORT} `);
});
