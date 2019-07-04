import React from 'react'

const defaultBorder = '1px solid black';

const Box = ({
  columnIndex,
  firstColumn,
  firstRow,
  lastColumn,
  lastRow,
  onClick,
  rowIndex,
  size = 100,
  value,
}) => {
  const boxStyle = {
    alignItems: 'center',
    borderLeft: !firstColumn && defaultBorder,
    borderRight: !lastColumn && defaultBorder,
    borderTop: !firstRow && defaultBorder,
    borderBottom: !lastRow && defaultBorder,
    display: 'flex',
    fontSize: size * 0.75,
    justifyContent: 'center',
    height: size,
    width: size,
  };
  const indexes = { columnIndex, rowIndex };
  return (
    <div
      style={boxStyle}
      onClick={() => {
        if (!value) {
          onClick(indexes)
        }
      }}
    >
      {value}
    </div>
  )
};

export default Box;
