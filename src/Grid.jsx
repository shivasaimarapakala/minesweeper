import React from "react";
import { useState } from "react";
import Square from "./Square";
import { generateMineFieldFromId, blockReveal } from "./utils";

const Grid = ({ items }) => {
  const [gridItems, setGridItems] = useState(items);
  const [firstClick, setFirstClick] = useState(true);
  const [statusMatrix, setStatusMatrix] = useState(items);

  const handleSquareClick = (id) => {
    let newItems = gridItems.map((row) => [...row]);
    let i = Math.floor((id - 1) / 10),
      j = (id - 1) % 10;

    if (firstClick) {
      newItems = generateMineFieldFromId(id, gridItems);
      setFirstClick(false);
      setGridItems(newItems);
    }

    if (gridItems[i][j] === null) {
      setStatusMatrix(
        (prevMatrix) => blockReveal(gridItems, prevMatrix, i, j));
    } else if (statusMatrix[i][j] !== 1) {
      let revealMatrix = [...statusMatrix];
      revealMatrix[i][j] = 1;
      setStatusMatrix(revealMatrix);
    }
  };
  

  return (
    <>
      {statusMatrix.map((row, i) => (
        <div className="board-row" key={i}>
          {row.map((value, j) => (
            <Square
              key={10 * i + j + 1}
              id={10 * i + j + 1}
              value={value ? gridItems[i][j] : null}
              status={value}
              onSquareClick={handleSquareClick}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Grid;
