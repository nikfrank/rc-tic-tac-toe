import React from 'react';

import { winningLineCoords } from './game-logic';

export const WinningLine = ({
  winner,
  index,
})=>{
  return (
    <svg viewBox='0 0 12 12' className='WinningLine'>
      <line
        x1={winningLineCoords[index][0][0]}
        y1={winningLineCoords[index][0][1]}
        x2={winningLineCoords[index][1][0]}
        y2={winningLineCoords[index][1][1]}
        className={winner}
      />
    </svg>
  );
};
