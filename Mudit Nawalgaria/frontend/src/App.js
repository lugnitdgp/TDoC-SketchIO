import { socket } from "./services/socket";
import {useState,useEffect} from "react";

function App() {
  const [name,setName] = useState('')
  const [users, setUsers] = useState([])
  useEffect(() => {
      socket.on("connect", () => {
      console.log('Server Connected!'); // true
      });
      socket.on('user-name', (name) => {
        setUsers(_user => [..._user,name])
      })
      socket.on("disconnect", () => {
      console.log('Server Disconnected!'); // true
      });
  }, [])
  const sendName = () => {
    socket.emit('user-name',name)
  }
  
  return (
    <>
    <h1> Sketch IO</h1>
    <p>{name}</p>
    <input placeholder="Enter your name"
      onChange = {(event) => {setName(event.target.value)}}
      onKeyPress = {(event) => event.key === "Enter"?sendName():null}
    />
    {
      users.map((user,i) => <p key={i}> {user}</p>)
    }
    </>
  );
}

export default App;
