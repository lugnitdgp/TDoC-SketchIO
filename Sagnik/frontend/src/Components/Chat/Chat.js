import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import TextContainer from '../Container/Container';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import './Chat.css';

let socket;

const Chat = ({ location, history }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');  
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const ENDPOINT = 'http://localhost:8000/';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setRoom(room);
		setName(name);

		socket.emit('join', { name, room }, (error) => {
			if (error) {
				alert(error);
				history.push('/');
			}
		});
	}, [ENDPOINT, location.search]); 

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			console.log('In sendMessage');
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	return (
		<div className='outerContainer'>
			<div className='container'>
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			<TextContainer users={users} />
		</div>
	);
};

export default Chat;