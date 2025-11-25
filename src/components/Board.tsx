import { useState } from 'react';
import type { GameState, Player } from '../types';
import { checkWinner, checkDraw } from '../gameLogic';
import { Square } from './Square';
import './Board.css';

export const Board = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    winningLine: null,
  });

  const handleSquareClick = (index: number) => {
    if (gameState.winner || gameState.isDraw || gameState.board[index]) {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, winningLine } = checkWinner(newBoard);
    const isDraw = !winner && checkDraw(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isDraw,
      winningLine,
    });
  };

  const handleReset = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      winningLine: null,
    });
  };

  const getStatusMessage = () => {
    if (gameState.winner) {
      return `Player ${gameState.winner} wins!`;
    }
    if (gameState.isDraw) {
      return "It's a draw!";
    }
    return `Current player: ${gameState.currentPlayer}`;
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{getStatusMessage()}</div>
      <div className="board">
        {gameState.board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
            isWinningSquare={gameState.winningLine?.includes(index) ?? false}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        New Game
      </button>
    </div>
  );
};
