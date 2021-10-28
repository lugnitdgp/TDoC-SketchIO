const http=require("http");
const express=require("express");
const socketio=require("socket.io");
const app=express();
const server=http.createServer(app);
const io=socketio(server,{cors:{origin:'*'}});


io.on("connection", (socket)=>{
    console.log("User Online");
    socket.on("canvas-data",(data)=>{
        socket.broadcast.emit("canvas-data",data);
    })
});

const PORT=5000;
server.listen(PORT,()=>{
    console.log("Server listening on port",PORT);
});
