import React from 'react';
import Tile from './Tile';
import {move} from '../model/game';

const pieces = ['r', 'n', 'b', 'q'];

function PromotablePieces({promotion: {from, to, color}}) {
  return (
    <div className="board">
      {pieces.map((p, i) => {
        return (
          <div key={i} className="promotable-pieces">
            <Tile dark={i % 3 === 0}>
              <div className="piece-container" onClick={() => move(from, to, p)}>
                <img
                  src={require(`../assets/basic/${p}.svg`)}
                  alt=""
                  className="piece cursor-pointer"
                />
              </div>
            </Tile>
          </div>
        );
      })}
    </div>
  );
}

export default PromotablePieces;
