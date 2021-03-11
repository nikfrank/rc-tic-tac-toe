import React from 'react';

export const Square = ({
  value,
})=>{
  return (
    <svg viewBox='0 0 10 10'>
      {
        value === 'O' ? (
          <circle cx={5} cy={5} r={3} />
        ) : value === 'X' ? (
          <path d='M 1 0 L 5 4 L 9 0 L 10 1 L 6 5 L 10 9 L 9 10 L 5 6 L 1 10 L 0 9 L 4 5 L 0 1 Z' />
        ) : null
      }
    </svg>
  );
};
