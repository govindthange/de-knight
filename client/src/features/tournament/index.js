import './index.css';
import React from 'react';
import Board from './components/Board';
import {useEffect, useState} from 'react';
import chessEventEmitter from './model/game';

function Tournament(props) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const subscribe = chessEventEmitter.subscribe(game => {
      setBoard(game.board);
    });

    // Stop listening once this component is unloaded!
    return () => subscribe.unsubscribe();
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
