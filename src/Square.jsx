import React, { useState, useEffect } from 'react';

function Square({ id, value, onSquareClick, status }) {
  const [flagged, setFlagged] = useState(false);


  useEffect(() => {
    if (status === 1) {
      onSquareClick(id);
    }
  }, [status]); 


  const handleClick = (event) => {
    event.preventDefault(); 

    if (event.button === 2) { 
      setFlagged(prevFlagged => !prevFlagged); 
    } else if (event.button === 0 && !flagged) { 
      onSquareClick(id);
    }
  };

  return (
    <button
      className={status ? 'square' : flagged ? 'flaggedSquare' : 'unrevealedSquare'}
      onMouseDown={handleClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {value}
    </button>
  );
}

export default Square;
