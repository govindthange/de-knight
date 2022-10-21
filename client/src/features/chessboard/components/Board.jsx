import React, {useEffect, useState} from 'react';
import BoardTile from './BoardTile';

export default function Board({board, turnBoard}) {
  const [currentBoard, setCurrentBoard] = useState([]);

  useEffect(() => {
    setCurrentBoard(turnBoard === 'w' ? board.flat() : board.flat().reverse());
  }, [board, turnBoard]);

  function getCoordinates(i) {
    const x = turnBoard === 'w' ? i % 8 : Math.abs((i % 8) - 7);
    const y = turnBoard === 'w' ? Math.abs(Math.floor(i / 8) - 7) : Math.abs(Math.floor(i / 8));
    return {x, y};
  }

  function isDark(i) {
    const {x, y} = getCoordinates(i);
    return (x + y) % 2 === 1;
  }

  // This function returns the piece's location in
  // the chess' standard algebraic notation format.
  function getPosition(i) {
    const {x, y} = getCoordinates(i);
    const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x];
    return `${horizontalAxis}${y + 1}`;
  }

  return (
    <>
      <div className="board">
        {currentBoard.flat().map((piece, i) => (
          <div key={i} className="board-tile">
            <BoardTile piece={piece} dark={isDark(i)} position={getPosition(i)} />
          </div>
        ))}
      </div>
    </>
  );
}
