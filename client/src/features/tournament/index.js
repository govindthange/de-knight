import './index.css';
import React from 'react';
import Board from './components/Board';
import {useEffect, useState} from 'react';
import {subjectObservable as chessSubject, start as startChess} from './model/game';

function Tournament(props) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    startChess();
    const subscription = chessSubject.subscribe(game => {
      setBoard(game.board);
    });

    // Stop listening once this component is unloaded!
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="tournament">
      <div className="board-container">
        <Board board={board} />
      </div>
    </div>
  );
}

export default Tournament;
