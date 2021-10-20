import { socket } from './services/socket';
import { useEffect, useState } from 'react';
const App = () => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  // users =
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Client with socket id : ', socket.id, 'got connected!!');
    });
    socket.on('user-name', (name) => {
      setUsers((_user) => [..._user, name]);
    });
    socket.on('disconnect', () => {
      console.log(socket.connected);
      console.log('Disconnected...');
    });
  }, []);

  const sendName = () => {
    // send name to the server
    socket.emit('user-name', name);
  };
  return (
    <>
      <h1>Sketchio</h1>
      <p>{name}</p>
      <input
        placeholder='Enter your name'
        onChange={(event) => {
          setName(event.target.value);
        }}
        onKeyPress={(event) => (event.key === 'Enter' ? sendName() : null)}
      />
      {users.map((user, i) => (
        // console.log(i))
        <p key={i}>{user}</p>
      ))}
    </>
  );
};
export default App;
