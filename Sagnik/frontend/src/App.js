import socket from "./service/socket"
import { useEffect, useState } from "react"

const App = () => {
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])
  useEffect( () => {
    socket.on('connect', () => {
     console.log('Connected !!');
    })
    socket.on('user-name', (name) => {
      setUsers(_user => [..._user, name])
    })
    socket.on('disconnect', () => {
      console.log('Disconnected !!');
     })
  }, [])
  const sendName = () => {
    socket.emit('user-name', name)
  }
  return (
    <>
    <h1> Sketch.io </h1>
    <p>{name}</p>
    <input
      placeholder = "Enter yor name"
      onChange = {(event) => {setName(event.target.value)}}
      onKeyPress = {(event) => event.key === "Enter" ? sendName() : null}
    />
    {
      users.map((user, j) => <p key = {j}> user </p>)
    }
    </>
  );
}

export default App;