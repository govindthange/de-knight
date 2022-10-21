import React from 'react';
import {useDrag, DragPreviewImage} from 'react-dnd';

function Piece({piece: {type, color}, position}) {
  const [{isDragging}, drag, preview] = useDrag({
    item: {
      type: 'piece',
      id: `${position}_${type}_${color}`
    },
    collect: monitor => {
      // We will let the Piece component know whether the user
      // is actually dragging the piece image or not.
      // Accordingly we can hide the tile image and avoid showing 2 images
      // (i.e. one along with the currsor and second on the tile)
      return {isDragging: !!monitor.isDragging()};
    }
  });

  // Display a piece image inside the tile.
  const imagePath = require(`../assets/${type}_${color}.svg`);
  return (
    // Without the help of preview & <DragPreviewImage /> the browser
    // will show a ghost like translucent image when dragging.
    <>
      <DragPreviewImage connect={preview} src={imagePath} />
      <div className="piece-container" ref={drag} style={{opacity: isDragging ? 0 : 1}}>
        <img src={imagePath} className="piece" />
      </div>
    </>
  );
}

export default Piece;
