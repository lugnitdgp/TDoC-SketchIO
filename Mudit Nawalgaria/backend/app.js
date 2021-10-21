const express = require('express')
const socketio = require ("socket.io")
const { createServer } = require('http') // createServer is the funtion used to create a HTTP server instance
const app = express()

const server = createServer(app) // HTTP server instance
const io = socketio(server,{cors:'*'}) // socket.io server object
const eventHandlers = require("./eventHandlers")(io)
io.on('connection',eventHandlers)
const PORT = 8000


server.listen(PORT, () => {
    // This is a callback funtion, which will be fired once the server starts listening
    console.log('server listening on port:', PORT)
})