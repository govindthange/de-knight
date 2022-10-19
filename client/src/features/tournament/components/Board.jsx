import React from 'react';
import BoardTile from './BoardTile';

export default function Board({board}) {
  function getCoordinates(i) {
    const x = i % 8;
    const y = Math.abs(Math.floor(i / 8) - 7);
    return {x, y};
  }

  function isDark(i) {
    const {x, y} = getCoordinates(i);
    return (x + y) % 2 === 1;
  }

  return (
    <>
      <div className="board">
        {board.flat().map((piece, i) => (
          <div key={i} className="board-tile">
            <BoardTile piece={piece} dark={isDark(i)} />
          </div>
        ))}
      </div>
    </>
  );
}
