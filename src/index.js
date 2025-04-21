import React from 'react';
import ReactDOM from "react-dom/client";
// import "./index.css";
import GuessGame from "./js/guessGame"
import Colors from './js/colorsMeans'

function Cards() {
  return(
    <div>
      <h1>Guess Game</h1>
      <div class='guess-game'
      style={{
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
      }}
      >
        <GuessGame/>
        <Colors/>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Cards />);

// , { useState, useEffect }