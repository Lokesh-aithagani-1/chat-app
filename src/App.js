import React, { useState } from 'react';
import Chat from './Chat';
import './App.css'; // Import a CSS file for styling

const App = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      {!showChat ? (
        <div className="start-chatting-container">
          <button className="start-chatting-button" onClick={() => setShowChat(true)}>
            Start Chatting
          </button>
        </div>
      ) : (
        <Chat />
      )}
    </div>
  );
};

export default App;
