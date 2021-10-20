import socket from './services/sockets'
import {useEffect, useState} from 'react';


const App = () => {
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected !!');
    })

    socket.on('user-name', (name) => {
      setUsers(_user => [..._user, name])
    })

    socket.on('disconnect', () => {
      console.log('Disconnected :(');
    })
  }, [])
  const sendName =() => {
    socket.emit('user-name', name)
  }
  return (
    <>
    <h1>Sketchio</h1>
    <p>{name}</p>
    <input
    placeholder = "Enter your name."
    onChange = {(event) => {setName(event.target.value)}}
    onKeyPress = {(event) => event.key === "Enter" ? sendName() : null}
    />
    {
      users.map((user, i)=><p key={i}> {user} </p>)
    }
    </>
  );
}

export default App;
