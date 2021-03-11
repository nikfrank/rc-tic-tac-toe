import React, { useState, useEffect } from "react";
import "./App.scss";

import { Square } from "./Square";

const initBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const paths = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],

  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],

  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],

  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],

  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
];

const wins = (board) =>
  paths
    .map((path) => path.reduce((t, [r, c]) => t + board[r][c], ""))
    .filter((l) => l.match(/(.)\1{2}/));

const boardAfterMove = (board) => ([r, c]) =>
  board.map((row, ri) =>
    ri !== r
      ? row
      : row.map((col, ci) =>
          ci !== c ? col : board.flat().join("").length % 2 ? "O" : "X"
        )
  );

const listLegalMoves = (board) =>
  Array(9)
    .fill(0)
    .map((o, i) => [Math.floor(i / 3), i % 3])
    .filter(([r, c]) => !board[r][c]);

const listThreats = (opp = false) => (board) => {
  const legalMoves = listLegalMoves(board);
  const lines = legalMoves.map(boardAfterMove(opp ? [...board, "!"] : board));
  const threatIndices = lines.reduce(
    (p, c, i) => (wins(c).length ? [...p, i] : p),
    []
  );
  const threats = lines.filter(b=> wins(b).length);

  return {
    threats,
    threatIndices,
  };
};

const cpChoose = (board) => {
  // list of legal moves
  const legalMoves = listLegalMoves(board);

  const lines = legalMoves.map(boardAfterMove(board));
  const winningLine = lines.findIndex(b=> wins(b).length);

  // if there's a winning move, play it.
  if (~winningLine) return legalMoves[winningLine];

  // if there's one move left, play it.
  if (legalMoves.length === 1) return legalMoves[0];

  // if opponent has one threat, block it.
  const { threats: oppThreats, threatIndices: oppThreatIndices } = listThreats(
    "opponent"
  )(board);

console.log(oppThreats.length, legalMoves[oppThreatIndices[0]])
  if (oppThreats.length === 1) return legalMoves[oppThreatIndices[0]];

  // if a move can make 2 threats to 0, play it.
  const myThreats = lines
    .map(listThreats())
    .map(({ threats }) => threats.length);

  const backThreats = lines
    .map(listThreats("opponent"))
    .map(({ threats }) => threats.length);

  const doubleThreat = myThreats.find((n, i)=> (
    n > 1 && !backThreats[i]
  ));

  if( doubleThreat ) return legalMoves[doubleThreat];

  // if a move allows the opponent 2 threats to 0, don't play it.
  // otherwise, just play a move (prefer to make a threat)

  // openings:
  // center
  if( !board.flat().join('').length ) return [1,1];

  if( board.flat().join('').length === 1){
    if(!board[1][1]) return [1,1];
    else return [2,2];
  }
  // corner -> center
  // edge -> center
  // center -> corner

  return legalMoves[0];
};

// more ideas:
// winning triple spins
// undo / redo
// deploy to pwa via manifest.json
// refactor threats function, legalMoves function
// testing coverage for loc
// testing coverage for cp moves

function App() {
  const [status, setStatus] = useState("playing");
  const [board, setBoard] = useState(initBoard);

  const clickSquare = (r, c, cpMove) => {
    if (status !== "playing") return;
    if (board[r][c]) return;
    if( !cpMove && board.flat().join('').length % 2 ) return;

    setBoard(boardAfterMove(board)([r, c]));
  };

  useEffect(() => {
    const winningLines = wins(board);

    if (winningLines.length) setStatus(winningLines[0][0] + " won");

    if (!winningLines.length && board.flat().join("").length === 9)
      setStatus("nobody won");

    else if (board.flat().join("").length % 2) {
      const cpMove = cpChoose(board);
      cpMove && clickSquare(...cpMove, "cpMove");
    }
  }, [board]);

  useEffect(() => {
    if (status !== "playing")
      setTimeout(() => {
        setBoard(initBoard);
        setStatus("playing");
      }, 2000);
  }, [status]);

  const legalMoves = listLegalMoves(board);
  const lines = legalMoves.map(boardAfterMove(board));
  const myThreats = listThreats()(board).threatIndices.map(
    (i) => legalMoves[i]
  );
  const oppThreats = listThreats("opp")(board).threatIndices.map(
    (i) => legalMoves[i]
  );

  const hint = cpChoose(board);

  return (
    <div className="App">
      {status !== "playing" ? <div className='status-title'>{status}</div> : null}
      <div className="game">
        {board.map((row, ri) => (
          <div key={ri} className="row">
            {row.map((tick, ci) => (
              <div
                key={ci}
                className={[
                  "square",
                  myThreats.find(([r, c]) => r === ri && c === ci) &&
                  status === "playing"
                    ? "my-win"
                    : "",
                  oppThreats.find(([r, c]) => r === ri && c === ci) &&
                  status === "playing"
                    ? "opp-win"
                    : "",
                  hint ? hint[0] === ri && hint[1] === ci ? 'hint' : '' :''
                ].join(" ")}
              >
                <Square tick={tick} onClick={() => clickSquare(ri, ci)} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
