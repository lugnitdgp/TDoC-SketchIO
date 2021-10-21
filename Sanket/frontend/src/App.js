
import socket from './services/sockets.js'
import {useEffect, useState} from "react";


function App() {

    const[name, setName]=useState("");
    const [users, setUsers]=useState([]);

  useEffect(()=>{

    socket.on('connect', ()=>{
      console.log(`client is connected ${socket.connected} with ID as ${socket.id}`);
    
    });

    socket.on("user-name", (name)=>{
      console.log(`Name is ${name}`);
      setUsers( _user => [..._user, name]);
    });
    

      
    socket.on('disconnect', ()=>{
      console.log(`client is now dis - connected ${socket.connected}`);
    });

  }, []);




    const sendName= ()=>{
        socket.emit("user-name", name);
        setName("");
    }

  return (
    <div>
    <h1>Sketchio</h1>

    <p> {name} </p>
    
    <input 
    type="text" 
    placeholder="Enter your name" 
    onChange={
      (event)=>{
        setName(event.target.value);
      }
    }
    onKeyPress={ 
      (event)=>
      {
        return (event.key==="Enter")? sendName() : null;
      }     
    }
      />

      
      
      {
      users.map(  (user,i)=> <p key={i}> {user} </p>)
      }

    </div>
  );
}

export default App;
