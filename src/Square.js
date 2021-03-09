import React from 'react';

export const Square = ({
  tick = '',
  onClick = ()=>0,
})=> (
  <svg viewBox='0 0 10 10' onClick={tick ? undefined : onClick}>
    {tick === 'X' ? (
      <path d='M 0 1 L 1 0 L 5 4 L 9 0 L 10 1 L 6 5 L 10 9 L 9 10 L 5 6 L 1 10 L 0 9 L 4 5 Z' />
    ) : tick === 'O' ? (
      <circle cx={5} cy={5} r={4}/>
    ) : null}
  </svg>
);
