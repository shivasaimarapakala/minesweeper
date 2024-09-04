import React from "react";
import { useState } from "react";
import Square from "./Square";
import { generateMineField } from "./utils";

const Grid = ({ items }) => {
  const [gridItems, setGridItems] = useState(items);
  const [firstClick, setFirstClick] = useState(true);
  const [statusMatrix, setStatusMatrix] = useState(items);

  const handleSquareClick = (id) => {
    let newItems = gridItems.map((row) => [...row]);
    let i = Math.floor((id - 1) / 10),
      j = (id - 1) % 10;

    if (firstClick) {
      let temp = true;
      let count = 0;
      while (temp && count < 20) {
        newItems = generateMineField(8, 10, 10);
        if (newItems[Math.floor((id - 1) / 10)][(id - 1) % 10] == null) {
          temp = false;
        }
        count++;
      }
      setFirstClick(false);
    }
    setGridItems(newItems);

    if (gridItems[i][j] === null) {
      let revealMatrix = statusMatrix.map((row) => [...row]);
      let x = gridItems.length - 1,
        y = gridItems[0].length - 1;
      let temp = [
        [i, j],
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
      ];
      temp.forEach((value) => {
        if (value[0] >= 0 && value[0] <= x && value[1] >= 0 && value[1] <= y) {
          if (revealMatrix[value[0]][value[1]] === null) {
            revealMatrix[value[0]][value[1]] = 1;
          }
        }
      });
      setStatusMatrix(revealMatrix);
    } else {
      statusMatrix[i][j] = 1;
      setStatusMatrix(statusMatrix);
    }
  };
  //
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
