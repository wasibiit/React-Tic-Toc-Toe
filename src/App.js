import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import logo from './logo.svg';
import './App.css';
import Board from "./Components/Board";

const ROWS = 3;
const COLUMNS = 3;
const ROW_ARR = new Array(ROWS).fill('');
const COL_ARR = new Array(COLUMNS).fill('');
const GRID = ROW_ARR.map(x => COL_ARR.slice());
const MIN_TO_WIN = 3;
const INITIAL_STATE = {
  currentValue: 'X',
  grid: cloneDeep(GRID),
  scoreX: 0,
  scoreO: 0,
  hasWon: false,
  hasWonMessage: null,
};

const diffCols = ({ arr, item }) => {
  const lastItem = arr[arr.length - 1];
  return item.colIndex - lastItem.colIndex;
};

const diffRows = ({ arr, item }) => {
  const lastItem = arr[arr.length - 1];
  return item.rowIndex - lastItem.rowIndex;
}

const compareToRest = ({ currentItem, gridItems, winString }) => {
  const N = [currentItem];
  const NE = [currentItem];
  const E = [currentItem];
  const SE = [currentItem];
  const S = [currentItem];
  const SW = [currentItem];
  const W = [currentItem];
  const NW = [currentItem];

  const applyDirection = (item) => {
    if (diffRows({ arr: N, item }) === 1 && diffCols({ arr: N, item }) === 0) {
      N.push(item);
    } else if (diffRows({ arr: NE, item }) === 1 && diffCols({ arr: NE, item }) === 1) {
      NE.push(item);
    } else if (diffRows({ arr: E, item }) === 0 && diffCols({ arr: E, item }) === 1) {
      E.push(item);
    } else if (diffRows({ arr: SE, item }) === -1 && diffCols({ arr: SE, item }) === 1) {
      SE.push(item);
    } else if (diffRows({ arr: S, item }) === -1 && diffCols({ arr: S, item }) === 0) {
      S.push(item);
    } else if (diffRows({ arr: SW, item }) === -1 && diffCols({ arr: SW, item }) === -1) {
      SW.push(item);
    } else if (diffRows({ arr: W, item }) === 0 && diffCols({ arr: W, item }) === -1) {
      W.push(item);
    } else if (diffRows({ arr: NW, item }) === 1 && diffCols({ arr: NW, item }) === -1) {
      NW.push(item);
    }

    const arrays = [N, NE, E, SE, S, SW, W, NW];
    const winningArrays = arrays.filter(arr => arr.length >= winString);
    return winningArrays.length > 0;
  }

  let hasWon = false;
  let i = 0;

  while (i < gridItems.length && !hasWon) {
    hasWon = applyDirection(gridItems[i]);
    i++;
  }

  return hasWon;
}

const flattenAndFilterArrays = (grid) => {
  const output = [];
  grid.forEach(arr => {
    output.push(...arr);
  });
  return output.filter(box => !!box);
}

const mapGridIndexes = ({ grid, value }) => {
  const mappedItems = grid.map((row, rowIndex) => row.map((col, colIndex) => {
      return col === value && {
        colIndex,
        rowIndex,
      }
    })
  )
  return flattenAndFilterArrays(mappedItems);
}

const checkWin = ({ gridItems, winString }) => {
  let hasWon = false;
  let i = 0;
  while (i < gridItems.length && !hasWon) {
    hasWon = compareToRest({ currentItem: gridItems[i], gridItems, winString });
    i++;
  }
  return hasWon;
}

class App extends Component {
  state = cloneDeep(INITIAL_STATE);

  handleClick = ({ columnIndex, rowIndex }) => {
    const {
      currentValue,
      scoreO,
      scoreX,
      grid,
      hasWon: gameOver,
    } = this.state;
    if (!gameOver) {
      const clonedGrid = cloneDeep(grid);
      const nextValue = currentValue === 'X' ? 'O' : 'X';
      clonedGrid[rowIndex][columnIndex] = currentValue;
      const gridItems = mapGridIndexes({ grid: clonedGrid, value: currentValue });
      const hasWon = checkWin({ gridItems, winString: MIN_TO_WIN });
      this.setState({
        currentValue: nextValue,
        grid: clonedGrid,
        hasWon,
        hasWonMessage: hasWon ? `Player ${currentValue} has Won!!` : null,
        scoreX:  hasWon ? scoreX + 20 : null,
        scoreO: !hasWon ? scoreO + 20 : null,
      });
    }
  }

  render() {
    const {
      grid,
      hasWon,
      hasWonMessage,
    } = this.state;
    return (
      <div>
       <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            Tic Toc Toe
        </header>

        <div className="display">
        {hasWon && (
            <h3>
              {hasWonMessage}
            </h3>
         )}
         <Board
           onClick={this.handleClick}
           rows={grid}
        />
        </div>
        <div className="score-board">
          <h1>Score Board</h1>

          <h3>Player X Score:{this.state.scoreX}</h3>
          <h3>Player O Score:{this.state.scoreO}</h3>
          <button
            onClick={() => this.setState(cloneDeep(INITIAL_STATE))}
          >
            Reset
          </button>
        </div>
    </div>
  );
  }
}

export default App;
