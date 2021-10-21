const express=require('express');
const app=express();

const {createServer}=require('http');
const httpServer=createServer(app); // http server instance


const {Server}=require('socket.io');
const io=new Server(httpServer, {
  cors:'*'
}); // socket.io server object

const PORT=8000;





const eventhandler=require('./eventHandler.js')(io);
// event handdler stores a function that is returned

io.on("connection",eventhandler );



httpServer.listen(PORT, ()=>{
  console.log(`Server listening at port ${PORT} has started`);
});
