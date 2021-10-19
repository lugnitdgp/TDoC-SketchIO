const express = require('express')
const { createServer } = require('http')


const app = express()
const server = createServer(app)
const io = require('socket.io')(server, { 
    cors: '*'
})

const eventHandlers = require('./eventHandlers')(io)

io.on('connection', eventHandlers)

server.listen(8000, () => {
    console.log('The server is listening on port', 8000);
})