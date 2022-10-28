import React, {useEffect, useState} from 'react';
import {useDrop} from 'react-dnd';
import {handleMove, subjectObservable as chessSubject} from '../model/game';
import Piece from './Piece';
import PromotablePieces from './PromotablePieces';
import Tile from './Tile';

function BoardTile({piece, dark, position}) {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: item => {
      const [from] = item.id.split('_');
      handleMove(from, position);
    }
  });

  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    const subscription = chessSubject.subscribe(({pendingPromotion} = undefined || {}) => {
      if (pendingPromotion) {
        // Here the game has reached a state where there is a promotion pending.
        // Handle this promotion!
        pendingPromotion.to === position ? setPromotion(pendingPromotion) : setPromotion(null);
      } else {
        setPromotion(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [position]);

  // Display an empty tile if a piece is not available!
  let content = piece && <Piece piece={piece} position={position} />;
  content = promotion ? <PromotablePieces promotion={promotion} /> : content;

  return (
    <div className="tile" ref={drop}>
      <Tile dark={dark}>{content}</Tile>
    </div>
  );
}

export default BoardTile;
