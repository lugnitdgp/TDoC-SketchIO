import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import ScrollableFeed from 'react-scrollable-feed';

let socket;
const CONNECTION_PORT = 'localhost:3002/';

function App() {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');

  // After Login
  const [message, setMessage] = useState('');
  const [word, setWord] = useState('');
  const [verdict, setverdict] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [guessList, setGuessList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      // data -> sender, message
      setMessageList((_messageList) => [..._messageList, data]);
    });
    socket.on('receive_word', (data) => {
      // data -> sender, word, verdict
      console.log('In receive_word :',data.verdict);
      // if(data.sender || data.message || data.word || data.verdict){
        setMessageList((_messageList) => [..._messageList, data]);
      // }
    });
  },[]);
  const connectToRoom = () => {
    socket.emit('join_room', room, () => {
      setLoggedIn(true);
    });
  };

  const sendMessage = async (event) => {
    event.target.value = ''
    let messageContent = {
      room: room,
      content: {
        sender: userName,
        message: message,
        word: word,
        verdict: verdict
      },
    };

    if (messageContent.content.message.startsWith('!')) {
      const len = messageContent.content.message.length;
      messageContent.content.word = messageContent.content.message.slice(
        1,
        len
      );
      messageContent.content.message = '';
      await socket.emit('send_word', messageContent);
      // messageContent -> sender, word
      // setMessageList((_messageList) => [..._messageList, messageContent.content]);
      setMessage('');
      setWord('');
      setverdict('');

    } else {
      await socket.emit('send_message', messageContent);
      // messageContent -> sender, message
      setMessageList((_messageList) => [..._messageList, messageContent.content]);
      setMessage('');
    }
  };



  return (
    <div className='App'>
      {!loggedIn ? (
        <div className='logIn'>
          <div className='inputs'>
            <input
              type='text'
              placeholder='Name...'
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type='text'
              placeholder='Room...'
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className='chatContainer'>
          <ScrollableFeed>
            <div className='messages'>
              {messageList.map((val, key) => {
                return (
                  <div
                    className='messageContainer'
                    id={val.sender === userName ? 'You' : 'Other'}
                    key={key}
                  >
                    {
                      (val.message && val.verdict === '' && val.word === '') ? (
                        <div className='messageBubble'>
                          { console.log("check :  ",typeof(val)) }
                          {val.sender}:{val.message}
                        </div>
                      ):(
                        <div className='messageBubble'>
                          {val.verdict}
                        </div>
                      )
                    }
                    
                    
                  </div>
                );
              })}
            </div>
            {/* <div className='messages'>
              {guessList.map((val, key) => {
                return (
                    <div className='messageBubble'>
                      {val}
                    </div>
                );
              })}
            </div> */}
          </ScrollableFeed>

          <div className='messageInput'>
            <input
              type='text'
              placeholder='Message...'
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(event) =>
                event.key === 'Enter' ? sendMessage(event) : null
              }
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;