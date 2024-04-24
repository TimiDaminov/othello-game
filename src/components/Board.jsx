import React from "react";
import { useState } from "react";
const Board = () => {
  const getScores = () => {
    let blackScore = 0;
    let whiteScore = 0;
    board.forEach((row) => {
      row.forEach((square) => {
        if (square === "black") {
          blackScore++;
        } else if (square === "white") {
          whiteScore++;
        }
      });
    });

    return { blackScore, whiteScore };
  };
  const handleClick = (row, col) => {
    // Step 1: create a new copy of the board state array
    const newBoard = board.slice();

    // Step 2: check if the current square is already occupied
    if (newBoard[row][col] !== "") {
      return;
    }

    // Step 3: create an empty array to hold flipped squares
    const flippedSquares = [];

    // Step 4: define directions to check
    const directions = [
      [0, 1], // right
      [1, 1], // down-right
      [1, 0], // down
      [1, -1], // down-left
      [0, -1], // left
      [-1, -1], // up-left
      [-1, 0], // up
      [-1, 1], // up-right
    ];

    // Step 5: check for valid moves in all directions
    directions.forEach((dir) => {
      let [drow, dcol] = dir;
      let row2 = row + drow;
      let col2 = col + dcol;
      let flipped = [];
      while (
        row2 >= 0 &&
        row2 < 8 &&
        col2 >= 0 &&
        col2 < 8 &&
        newBoard[row2][col2] !== "" &&
        newBoard[row2][col2] !== turn
      ) {
        flipped.push([row2, col2]);
        row2 += drow;
        col2 += dcol;
      }
      if (
        row2 >= 0 &&
        row2 < 8 &&
        col2 >= 0 &&
        col2 < 8 &&
        flipped.length &&
        newBoard[row2][col2] === turn
      ) {
        flippedSquares.push([row, col]);
        flippedSquares.push(...flipped);
      }
    });

    // Step 6: if any squares were flipped, update the board
    if (flippedSquares.length) {
      flippedSquares.forEach((square) => {
        let [row, col] = square;
        newBoard[row][col] = turn;
      });

      setBoard(newBoard);

      // Step 8: update the turn state
      setTurn(turn === "black" ? "white" : "black");
      setScores(getScores());
    }
  };

  const [board, setBoard] = useState([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "white", "black", "", "", ""],
    ["", "", "", "black", "white", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ]);
  const [scores, setScores] = useState(getScores());
  const [turn, setTurn] = useState("black");

  return (
    <div>
      <div className="board-wrapper">
        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((square, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`square ${square}`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                ></button>
              ))}
            </div>
          ))}
        </div>
        <p>Turn: {turn}</p>
        <p>Black Score: {scores.blackScore}</p>
        <p>White Score: {scores.whiteScore}</p>
      </div>
    </div>
  );
};

export default Board;
