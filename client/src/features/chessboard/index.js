import './index.css';
import React from 'react';
import Board from './components/Board';
import {useEffect, useState} from 'react';
import {
  subjectObservable as chessSubject,
  start as startChess,
  reset as restartChess,
  getResult
} from './model/game';

function Chessboard(props) {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turnChessboard, setTurnChessboard] = useState();

  useEffect(() => {
    startChess();
    const subscription = chessSubject.subscribe(game => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(getResult());
      setTurnChessboard(game.turnChessboard);
    });

    // Stop listening once this component is unloaded!
    return () => subscription.unsubscribe();
  }, []);

  let statusContent;
  if (isGameOver) {
    statusContent = (
      <button onClick={() => restartChess()}>
        <span>New Game</span>
      </button>
    );
  } else {
    statusContent = (
      <button onClick={() => restartChess()}>
        <span>Reset Game</span>
      </button>
    );
  }

  let resultContent;
  if (result) {
    resultContent = <p>{result}</p>;
  }

  return (
    <>
      <div className="chessboard">
        <div className="board-container">
          <Board board={board} turnBoard={turnChessboard} />
        </div>
      </div>
      <div className="chessboard-status">
        {resultContent}
        {statusContent}
      </div>
    </>
  );
}

export default Chessboard;
