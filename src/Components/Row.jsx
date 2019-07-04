import React from 'react';
import "../App.css";
import Box from './Box';

const Row = ({
  boxes,
  firstRow,
  lastRow,
  onClick,
  rowIndex,
}) => (
  <div className="Row-Style">
    {boxes.map((box, index) => (
      <Box
        columnIndex={index}
        key={index}
        firstColumn={index === 0}
        firstRow={firstRow}
        lastColumn={index === boxes.length - 1}
        lastRow={lastRow}
        onClick={onClick}
        rowIndex={rowIndex}
        value={box}
      />
    ))}
  </div>
);

export default Row;

