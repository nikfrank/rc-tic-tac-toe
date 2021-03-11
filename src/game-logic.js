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

export const winner = (board)=>
  winLines
    .map(line=> (
      line.map(([r, c])=> board[r][c]).join('')
    ))
    .map(str=> ['OOO', 'XXX'].includes(str) ? str : '');
