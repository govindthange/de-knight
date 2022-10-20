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

function Tournament(props) {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    startChess();
    const subscription = chessSubject.subscribe(game => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(getResult());
    });

    // Stop listening once this component is unloaded!
    return () => subscription.unsubscribe();
  }, []);

  let statusContent;
  if (isGameOver) {
    statusContent = (
      <h2 className="vertical-text">
        Game Over
        <button onClick={() => restartChess()}>
          <span className="vertical-text">New Game</span>
        </button>
      </h2>
    );
  }

  let resultContent;
  if (result) {
    resultContent = <p className="vertical-text">{result}</p>;
  }

  return (
    <div className="tournament">
      {statusContent}
      <div className="board-container">
        <Board board={board} />
      </div>
      {resultContent}
    </div>
  );
}

export default Tournament;
