const express = require('express')
const {createServer}=require('http')
const socketio = require('socket.io')



const app = express()
const server = createServer(app)
const io = require('socket.io')(server,{cors: '*'})

const eventHandlers = require('./eventHandlers')(io)

io.on('connection', eventHandlers)



const PORT=8000

server.listen(PORT, ()=>{
    console.log('server listening on port: ', PORT)
})