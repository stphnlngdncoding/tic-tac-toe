import type { SquareValue } from '../types';
import './Square.css';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
}

export const Square = ({ value, onClick, isWinningSquare }: SquareProps) => {
  return (
    <button
      className={`square ${value ? 'filled' : ''} ${isWinningSquare ? 'winning' : ''}`}
      onClick={onClick}
      disabled={value !== null}
    >
      {value && <span className="square-value">{value}</span>}
    </button>
  );
};
