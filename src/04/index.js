import { range } from '../../lib/utils';

export const formatInput = input =>
  input.split('\n\n')
  |> ([drawnPool, ...grids]) => ({
    drawnPool: drawnPool.split(',').map(Number),
    grids: grids.map(board =>
      board.split('\n').map(row => row.split(' ').filter(Boolean).map(Number)),
    ),
  })
  |> ({ drawnPool, grids }) => {
    const dimensions = [grids[0].length, grids[0][0].length];
    const generate = (acc, curr) => ({ ...acc, [curr]: 0 });

    return {
      drawnPool,
      dimensions,
      boards: grids.map((grid, index) => ({
        index,
        grid,
        undrawn: grid.flat(),
        drawnsByLine: range(dimensions[0]).reduce(generate, {}),
        drawnsByColumn: range(dimensions[1]).reduce(generate, {}),
      })),
    };
  };

const addDrawnNumber = ({ board, number }) => {
  board.undrawn = board.undrawn.filter(n => n !== number);
  let row = board.grid.findIndex(row => row.includes(number));
  let column = board.grid[row].findIndex(cell => cell === number);
  board.drawnsByLine[row]++;
  board.drawnsByColumn[column]++;
  return board;
};

const isWinning = ({ board, dimensions }) =>
  Object.values(board.drawnsByLine).includes(dimensions[0]) ||
  Object.values(board.drawnsByColumn).includes(dimensions[1]);

const hasWon = ({ board, winningBoards }) =>
  winningBoards.map(({ board }) => board.index).includes(board.index);

const calculateResult = ({ number, board }) =>
  number * board.undrawn.reduce((total, number) => total + number, 0);

export const partOne = ({ drawnPool, dimensions, boards }) => {
  for (let number of drawnPool) {
    for (let b = 0; b < boards.length; b++) {
      if (boards[b].undrawn.includes(number)) {
        boards[b] = addDrawnNumber({ number, board: boards[b] });

        if (isWinning({ board: boards[b], dimensions })) {
          return calculateResult({
            number,
            board: boards[b],
          });
        }
      }
    }
  }
};

export const partTwo = ({ drawnPool, dimensions, boards }) => {
  let winningBoards = [];

  for (let number of drawnPool) {
    for (let b = 0; b < boards.length; b++) {
      if (hasWon({ board: boards[b], winningBoards })) {
        continue;
      }

      if (boards[b].undrawn.includes(number)) {
        boards[b] = addDrawnNumber({ number, board: boards[b] });

        if (isWinning({ board: boards[b], dimensions })) {
          winningBoards.push({
            number,
            board: boards[b],
          });
        }
      }
    }
  }

  return calculateResult(winningBoards.at(-1));
};
