import React, { useState } from 'react';
import './App.scss';

import { Square } from './Square';

import { winner } from './game-logic';

const initBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function App() {
  const [board, setBoard] = useState(initBoard);

  const clickSquare = (r, c)=>{
    const nextTurn = board.flat().join('').length % 2 ? 'O' : 'X';
    
    setBoard(
      board.map((row, ri)=> r !== ri ? row : (
        row.map((cell, ci)=> ((c !== ci) || cell) ? cell : (
          nextTurn
        ))
      ))
    );
  };

  console.log( winner(board) );
  
  return (
    <div className="App">
      <div className='board'>
        {
          board.map((row, ri)=> (
            <div key={ri} className='row'>
              {
                row.map((cell, ci)=> (
                  <div
                    key={ci}
                    className='square'
                    onClick={()=> clickSquare(ri, ci)}
                  >
                    <Square value={cell} />
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
