import React from 'react';

function Piece({piece: {type, color}}) {
  // Display a piece image inside the tile.
  const imagePath = require(`../../../assets/images/${type}_${color}.png`);
  return (
    <div className="piece-container">
      <img src={imagePath} className="piece" />
    </div>
  );
}

export default Piece;
