import socket from './services/sockets'
import { useEffect, useState } from 'react'

const App = () => {

  const [name, setName] = useState('_Blank_')
  const [users, setUsers] = useState([])

  useEffect(() => {
    
    socket.on('connect', () => {
      console.log('Client got connected');
    })
    
    socket.on('user-name', (name) => {
      setUsers(user => [...user,name])
    })

    socket.on('disconnect',() => {
      console.log('Server got disconnected');
    })

  }, [])

  const sendName = () => {
    // console.log('Called sendName');
    socket.emit('user-name',name)
  }
  
  return (
    <>
    <h1>Sketchio</h1>
    <p>{name}</p>
    <input
      placeholder = "Enter your name"
      onChange = {(event) => {setName(event.target.value)}}
      onKeyPress = { (event) => {return event.key ==='Enter'? sendName() : null}}
    />
    
    {
      <ol>{users.map((user, i) => {
      return(<li key = {i}>{user}</li>); })}</ol>
    }
    </>
  );
};

export default App;
