import React from "react";
import Board from "./components/Board";
import { useState } from "react";
function App() {
  let [gameStarted, setGameStarted] = useState(false);
  return (
    <div className="App">
      <h1 className="othelloHeader">Othello game!</h1>
      {gameStarted ? (
        <Board />
      ) : (
        <div className="startGame">
          <button onClick={() => setGameStarted(true)} className="startGameBtn">
            Start Game!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
