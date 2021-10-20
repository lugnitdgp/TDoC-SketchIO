const http=require("http");//creates HTTP server
const express=require("express");
const socketio=require("socket.io");
// const router = require('./router');
const app=express();
const server=http.createServer(app);
const io=socketio(server,{cors:{origin:'*'}});

const eventHandlers=require("./eventHandlers")(io)
io.on("connection", eventHandlers);

const PORT=8000;
server.listen(PORT,()=>{
    console.log("Server listening on port",PORT);
});

