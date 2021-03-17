const winLines = [
  [[0,0], [0,1], [0,2]],
  [[0,0], [1,1], [2,2]],

  [[1,0], [1,1], [1,2]],
  
  [[2,0], [2,1], [2,2]],
  [[2,0], [1,1], [0,2]],

  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
];

export const winningLineCoords = [
  [[2, 0], [2, 12]],
  [[0, 0], [12, 12]],
  [[6, 0], [6, 12]],
  [[10, 0], [10, 12]],
  [[0, 12], [12, 0]],
  [[0, 2], [12, 2]],
  [[0, 6], [12, 6]],
  [[0, 10], [12, 10]],
];

export const winner = (board)=>
  winLines
    .map(line=> (
      line.map(([r, c])=> board[r][c]).join('')
    ))
    .map(str=> ['OOO', 'XXX'].includes(str) ? str : '');


export const boardAfterMove = (board, c, r)=>{
  const nextTurn = board.flat().join('').length % 2 ? 'O' : 'X';

  return board.map((col, ci)=> c !== ci ? col : (
    col.map((cell, ri)=> ((r !== ri) || cell) ? cell : (
      nextTurn
    ))
  ));
};
