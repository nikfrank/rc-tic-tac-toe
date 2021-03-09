import React, { useState, useEffect } from 'react';
import './App.scss';

import { Square } from './Square';

const initBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const wins = [
  [[0, 0], [0,1], [0,2]],
  [[0, 0], [1,0], [2,0]],
  [[0, 0], [1,1], [2,2]],

  [[0, 1], [1,1], [2,1]],

  [[0, 2], [1,1], [2,0]],
  [[0, 2], [1,2], [2,2]],

  [[1, 0], [1,1], [1,2]],

  [[2, 0], [2,1], [2,2]],
];

const cpChoose = board=> {
  // if there's a winning move, play it.
  // if there's one move left, play it.
  // if opponent has one threat, block it.
  // if a move can make 2 threats to 0, play it.
  // if a move allows the opponent 2 threats to 0, don't play it.
  // otherwise, just play a move (prefer to make a threat)

  // openings:
  // center

  // corner -> center
  // edge -> center
  // center -> corner

};

function App() {
  const [status, setStatus] = useState('playing');
  const [board, setBoard] = useState(initBoard);

  const clickSquare = (r, c, cpMove)=> {
    if(status !== 'playing') return;
    if(board[r][c]) return;
    //if( !cpMove && board.flat().join('').length % 2 ) return;

    setBoard(
      board.map((row, ri)=> ri !== r ?
        row :
        row.map((col, ci)=> ci !== c ?
        col :
        board.flat().join('').length % 2 ? 'O' : 'X'
      ))
    )
  };

  useEffect(()=> {
    const winningLines =
      wins
        .map(win=> win.reduce((t, [r, c])=> (t + board[r][c]), ''))
        .filter(l=> l.match(/(.)\1{2}/));

    if( winningLines.length )
      setStatus(winningLines[0][0] + ' won');

    if( !winningLines.length && board.flat().join('').length === 9)
      setStatus('nobody won');

    else if( 0 && board.flat().join('').length % 2 ){
      const [cpr, cpc] = cpChoose(board);
      clickSquare(cpr, cpc, 'cpMove');
    }
  }, [board]);

  useEffect(()=> {
    if( status !== 'playing' ) setTimeout(()=> {
      setBoard(initBoard);
      setStatus('playing');
    }, 2000);
  }, [status]);

  return (
    <div className="App">
      {status !== 'playing' ? status : null}
      <div className='game'>
        {board.map((row, ri)=>(
          <div key={ri} className='row'>
            {row.map((tick, si)=> (
              <div key={si} className='square'>
                <Square
                  tick={tick}
                  onClick={()=> clickSquare(ri, si)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
