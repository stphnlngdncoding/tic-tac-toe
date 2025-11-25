import type { Board, Player, SquareValue } from './types';
import { checkWinner, checkDraw } from './gameLogic';

export type Difficulty = 'easy' | 'medium' | 'hard';

const getAvailableMoves = (board: Board): number[] => {
  return board.map((val, idx) => (val === null ? idx : -1)).filter(idx => idx !== -1);
};

const getOpponent = (player: Player): Player => {
  return player === 'X' ? 'O' : 'X';
};

// Easy AI: Random move
const getRandomMove = (board: Board): number => {
  const availableMoves = getAvailableMoves(board);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Check if there's a winning move or a blocking move
const findStrategicMove = (board: Board, player: Player): number | null => {
  const availableMoves = getAvailableMoves(board);

  // First, check if we can win
  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = player;
    if (checkWinner(testBoard).winner === player) {
      return move;
    }
  }

  // Then, check if we need to block opponent
  const opponent = getOpponent(player);
  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = opponent;
    if (checkWinner(testBoard).winner === opponent) {
      return move;
    }
  }

  return null;
};

// Medium AI: Try to win, block opponent, or take center/corner
const getMediumMove = (board: Board, player: Player): number => {
  // Check for strategic moves (win or block)
  const strategicMove = findStrategicMove(board, player);
  if (strategicMove !== null) {
    return strategicMove;
  }

  const availableMoves = getAvailableMoves(board);

  // Prefer center
  if (board[4] === null) {
    return 4;
  }

  // Prefer corners
  const corners = [0, 2, 6, 8].filter(idx => availableMoves.includes(idx));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

// Hard AI: Minimax algorithm
const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): number => {
  const { winner } = checkWinner(board);

  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (checkDraw(board)) return 0;

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = aiPlayer;
      const score = minimax(testBoard, depth + 1, false, aiPlayer, humanPlayer);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = humanPlayer;
      const score = minimax(testBoard, depth + 1, true, aiPlayer, humanPlayer);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

const getHardMove = (board: Board, player: Player): number => {
  const availableMoves = getAvailableMoves(board);
  const opponent = getOpponent(player);

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = player;
    const score = minimax(testBoard, 0, false, player, opponent);

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

export const getComputerMove = (board: Board, player: Player, difficulty: Difficulty): number => {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length === 0) {
    throw new Error('No available moves');
  }

  switch (difficulty) {
    case 'easy':
      return getRandomMove(board);
    case 'medium':
      return getMediumMove(board, player);
    case 'hard':
      return getHardMove(board, player);
    default:
      return getRandomMove(board);
  }
};
