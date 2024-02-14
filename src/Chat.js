import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'; // Import a CSS file for styling

const socket = io('http://localhost:5000'); 

const Chat = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [chat, setChat] = useState([]);
  const userColors = {}; 

  useEffect(() => {
    
    socket.on('message', (message) => {
      setChat((prevChat) => [...prevChat, message]);

      if (!userColors[message.user]) {
        userColors[message.user] = getRandomColor();
      }
    });

    
    return () => {
      socket.disconnect();
    };
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getUserColor = (user) => {
    if (!userColors[user]) {
      // Assign a random color if the user doesn't have one
      userColors[user] = getRandomColor();
    }
    return userColors[user];
  };

  const sendMessage = () => {
    if (message.trim() !== '' && username.trim() !== '') {
      const data = {
        user: username,
        content: message,
        color: getUserColor(username), 
      };

  
      socket.emit('message', data);

      
      setChat((prevChat) => [...prevChat, data]);

      
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === username ? 'own-message' : ''}`}
            style={{ color: getUserColor(msg.user) }}
          >
            <span className="timestamp">{msg.timestamp}</span>
            <strong>{msg.user}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
