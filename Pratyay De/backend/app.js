const express = require('express')
const { createServer } = require('http')
const socketio = require('socket.io')

const app = express()
const server = createServer(app)
const io = socketio(server,{
      cors:'*'
})
const port = 8000

server.listen(port, () => {
      console.log("The server is running at port: ", port);
})

const eventHandlers = require('./eventHandlers')(io)
io.on('connection', eventHandlers)

