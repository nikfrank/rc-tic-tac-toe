import React, { useState, useMemo, useEffect } from 'react';
import './App.scss';

import { Square } from './Square';
import { WinningLine } from './WinningLine';

import { winner, boardAfterMove } from './game-logic';

const initBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function App() {
  const [board, setBoard] = useState(initBoard);

  const clickSquare = (c, r)=>
    setBoard(
      boardAfterMove(board, c, r)
    );

  const currentWinner =
    useMemo(
      ()=> winner(board),
      [board]
    );

  const currentWinnerString = useMemo(
    ()=> currentWinner.join(),
    [currentWinner]
  );
  
  const winningPlayer = useMemo(
    ()=> currentWinner.find(line=> line),
    [currentWinnerString]
  );
    
  const winningIndex = useMemo(
    ()=> currentWinner.findIndex(line=> line),
    [currentWinnerString]
  );

  useEffect(()=> {
    if(winningPlayer)
      setTimeout(()=> setBoard(initBoard), 3000);
  }, [winningPlayer]);
  
  return (
    <div className="App">
      <div className='board'>
        {
          board.map((col, ci)=> (
            <div key={ci} className='col'>
              {
                col.map((cell, ri)=> (
                  <div
                    key={ri}
                    className='square'
                    onClick={()=> clickSquare(ci, ri)}
                  >
                    <Square value={cell} />
                  </div>
                ))
              }
            </div>
          ))
        }
        {
          winningPlayer ? (
            <WinningLine
              winner={winningPlayer}
              index={winningIndex}
            />
          ) : null
        }
      </div>
    </div>
  );
}

export default App;
