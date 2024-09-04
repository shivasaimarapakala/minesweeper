import React, { useState, useEffect } from 'react';

function Square({ id, value, onSquareClick, status }) {
  const [flagged, setFlagged] = useState(false);


  useEffect(() => {
    if (status === 1) {
      console.log(id);
      onSquareClick(id);
    }
  }, [status]);


  const handleClick = (event) => {
    event.preventDefault(); 

    if (event.button === 2) { // Right-click
      setFlagged(prevFlagged => !prevFlagged); 
    } else if (event.button === 0 && !flagged) { 
      onSquareClick(id);
    }
  };

  return (
    <button
      className={`square ${status ? "revealedSquare" : "unrevealedSquare"}${flagged ? " flaggedSquare" : ""}`}
      onMouseDown={handleClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {value}
    </button>
  );
}

export default Square;
