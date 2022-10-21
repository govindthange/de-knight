import React from 'react';

function Tile({children, dark}) {
  // Display dark and light tile as appropriate.
  const bgClass = dark ? 'tile-dark' : 'tile-light';
  return <div className={`${bgClass} tile`}>{children}</div>;
}

export default Tile;
