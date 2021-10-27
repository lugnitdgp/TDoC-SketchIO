const express = require("express");
const app = express();

const server = app.listen("3002", () => {
  console.log("Server Running on Port 3002...");
});
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const { addUser } = require('./users');


io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data, cb) => {
    socket.join(data);
    cb()
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  const word = 'nice';
  socket.on("send_word",(data) => {

    // console.log("in send word");
    console.log(data);
    let message; 
    if(word === data.content.word){
      message = data.content.sender + " has guessed the word!";
    }else{
      message = data.content.sender + " made a wrong guess!";
    }
    console.log(message);
    data.content.verdict = message;
    io.in(data.room).emit("receive_word", data.content);
  })
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});