import React from 'react';
import Piece from './Piece';
import Tile from './Tile';

function BoardTile({piece, dark}) {
  // Display an empty tile if a piece is not available!
  return (
    <div className="tile">
      <Tile dark={dark}>{piece && <Piece piece={piece} />}</Tile>
    </div>
  );
}

export default BoardTile;
