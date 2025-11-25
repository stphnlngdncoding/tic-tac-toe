import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, Player } from '../types';
import { checkWinner, checkDraw } from '../gameLogic';
import { getComputerMove, type Difficulty } from '../ai';
import { Square } from './Square';
import './Board.css';

type GameMode = 'pvp' | 'pvc';

export const Board = () => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    winningLine: null,
  });
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const computerMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMove = useCallback((index: number) => {
    setGameState((prevState) => {
      if (prevState.winner || prevState.isDraw || prevState.board[index]) {
        return prevState;
      }

      const newBoard = [...prevState.board];
      newBoard[index] = prevState.currentPlayer;

      const { winner, winningLine } = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);

      return {
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        winningLine,
      };
    });
  }, []);

  // Computer player logic
  useEffect(() => {
    if (
      gameMode === 'pvc' &&
      gameStarted &&
      gameState.currentPlayer === 'O' &&
      !gameState.winner &&
      !gameState.isDraw &&
      !isComputerThinking &&
      !computerMoveTimeoutRef.current
    ) {
      setIsComputerThinking(true);

      // Add a small delay to make it feel more natural
      const timer = setTimeout(() => {
        const computerMoveIndex = getComputerMove(gameState.board, 'O', difficulty);
        handleMove(computerMoveIndex);
        setIsComputerThinking(false);
        computerMoveTimeoutRef.current = null;
      }, 500);

      computerMoveTimeoutRef.current = timer;
    }
  }, [gameMode, gameStarted, gameState.currentPlayer, gameState.winner, gameState.isDraw, difficulty, handleMove, gameState.board]);

  const handleSquareClick = (index: number) => {
    // In PvC mode, only allow human player (X) to click
    if (gameMode === 'pvc' && gameState.currentPlayer === 'O') {
      return;
    }
    handleMove(index);
  };

  const handleReset = () => {
    if (computerMoveTimeoutRef.current) {
      clearTimeout(computerMoveTimeoutRef.current);
      computerMoveTimeoutRef.current = null;
    }
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
      winningLine: null,
    });
    setIsComputerThinking(false);
  };

  const handleNewGame = () => {
    setGameMode(null);
    setGameStarted(false);
    handleReset();
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const getStatusMessage = () => {
    if (gameState.winner) {
      if (gameMode === 'pvc') {
        return gameState.winner === 'X' ? 'You win!' : 'Computer wins!';
      }
      return `Player ${gameState.winner} wins!`;
    }
    if (gameState.isDraw) {
      return "It's a draw!";
    }
    if (isComputerThinking) {
      return 'Computer is thinking...';
    }
    if (gameMode === 'pvc') {
      return gameState.currentPlayer === 'X' ? 'Your turn (X)' : 'Computer\'s turn (O)';
    }
    return `Current player: ${gameState.currentPlayer}`;
  };

  // Mode selection screen
  if (gameMode === null) {
    return (
      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div className="mode-selection">
          <h2>Select Game Mode</h2>
          <button className="mode-button" onClick={() => setGameMode('pvp')}>
            Player vs Player
          </button>
          <button className="mode-button" onClick={() => setGameMode('pvc')}>
            Player vs Computer
          </button>
        </div>
      </div>
    );
  }

  // Difficulty selection screen (only for PvC mode)
  if (gameMode === 'pvc' && !gameStarted) {
    return (
      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div className="mode-selection">
          <h2>Select Difficulty</h2>
          <button
            className={`difficulty-button ${difficulty === 'easy' ? 'selected' : ''}`}
            onClick={() => setDifficulty('easy')}
          >
            Easy
          </button>
          <button
            className={`difficulty-button ${difficulty === 'medium' ? 'selected' : ''}`}
            onClick={() => setDifficulty('medium')}
          >
            Medium
          </button>
          <button
            className={`difficulty-button ${difficulty === 'hard' ? 'selected' : ''}`}
            onClick={() => setDifficulty('hard')}
          >
            Hard
          </button>
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
          <button className="back-button" onClick={() => setGameMode(null)}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-info">
        {gameMode === 'pvc' && (
          <div className="difficulty-display">Difficulty: {difficulty}</div>
        )}
      </div>
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
      <div className="button-group">
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
        <button className="new-game-button" onClick={handleNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
};
