export type Player = 'X' | 'O';
export type SquareValue = Player | null;
export type Board = SquareValue[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isDraw: boolean;
  winningLine: number[] | null;
}
