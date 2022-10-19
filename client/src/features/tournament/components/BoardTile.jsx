import React from 'react';
import {useDrop} from 'react-dnd';
import {move} from '../model/game';
import Piece from './Piece';
import Tile from './Tile';

function BoardTile({piece, dark, position}) {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: item => {
      const [from] = item.id.split('_');
      move(from, position);
    }
  });

  // Display an empty tile if a piece is not available!
  return (
    <div className="tile" ref={drop}>
      <Tile dark={dark}>{piece && <Piece piece={piece} position={position} />}</Tile>
    </div>
  );
}

export default BoardTile;
