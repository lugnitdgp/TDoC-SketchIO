const express = require('express');
const { createServer } = require('http');

const app = express();
const server = createServer(app);
const io = require('socket.io')(server, {
    cors: '*'
});
const eventHandlers = require('./eventHandlers')(io);
const PORT = 8000;

io.on('connection', eventHandlers);

app.get('/', (req, res)=>{
    res.send("<h1>HELLO</h1>");
})

server.listen(PORT, () => {
    console.log('server listening on port:', PORT);
});