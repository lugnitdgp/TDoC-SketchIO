const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server, {cors: "*"});

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
	console.log('connected');
	socket.on('join', ({ name, room }, callback) => {
		console.log('in Join');
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to room ${user.room}.`,
		});
		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name} has joined!` });

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room),
		});

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		console.log('in sendMessage');

		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});

	socket.on('canvas-data', (data) => {
		socket.broadcast.emit('canvas-data', data);
		console.log("draw connected");
	})

	socket.on('disconnect', () => {
		console.log('disconnected');
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', {
				user: 'Admin',
				text: `${user.name} has left.`,
			});
			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
	});
});

server.listen(8000, () => console.log(`Server has started.`));