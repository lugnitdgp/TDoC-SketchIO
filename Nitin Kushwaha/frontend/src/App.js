import socket from './services/sockets'
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [users, setUser] = useState([]);
  useEffect(()=>{
    socket.on('connect', ()=>{
      console.log('Server connected!');
    });
    socket.on('user-name', (name)=>{
      setUser(user => [...user, name]);
    })
    socket.on('all-users', (users)=>{
      console.log(users);
    })
    socket.on('disconnect', ()=>{
      console.log('Server disconnected!');
    });
  }, []);

  function sendName(){
    socket.emit('user-name', name);
  }

  return (
    <>
    <h1>Sketchio</h1>
    <input
      placeholder = "Enter your name..."
      onChange = {(event) => {setName(event.target.value)}}
      onKeyPress = {(event)=>event.key==='Enter'?sendName():null}
    ></input>
    {
      users.map((user, i) => <p key={i}>{user}</p>)
    }
    </>
  );
}

export default App;
