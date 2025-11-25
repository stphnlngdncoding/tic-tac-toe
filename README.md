# Tic-Tac-Toe Game

A modern, animated tic-tac-toe game built with React, TypeScript, and Vite. Play against a friend or challenge the computer AI with three difficulty levels!

## Features

### 🎮 Game Modes
- **Player vs Player** - Classic two-player mode
- **Player vs Computer** - Challenge the AI opponent

### 🤖 AI Difficulty Levels
- **Easy** - Random moves, perfect for beginners
- **Medium** - Strategic play with win/block detection and smart positioning
- **Hard** - Unbeatable AI using the Minimax algorithm

### ✨ Highlights
- Beautiful gradient background with smooth animations
- Winning square highlights with pulse animation
- Pop-in animations for X and O placements
- Hover effects on interactive elements
- "Computer is thinking..." status display
- Responsive design
- TypeScript for type safety

## Project Structure

```
src/
├── components/
│   ├── Board.tsx          # Main game board component
│   ├── Board.css          # Board styling and animations
│   ├── Square.tsx         # Individual square component
│   └── Square.css         # Square styling with animations
├── types.ts               # TypeScript type definitions
├── gameLogic.ts           # Win/draw detection logic
├── ai.ts                  # Computer player AI implementation
├── App.tsx                # Main app wrapper
└── index.css              # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

1. **Select Game Mode**: Choose between Player vs Player or Player vs Computer
2. **Choose Difficulty** (if playing against computer): Select Easy, Medium, or Hard
3. **Start Game**: Click the "Start Game" button
4. **Make Your Move**: Click on any empty square to place your mark (X)
5. **Win the Game**: Get three in a row (horizontally, vertically, or diagonally)
6. **Play Again**: Use "Reset Game" to play with the same settings, or "New Game" to change modes

## AI Implementation

### Easy Mode
- Makes random moves from available squares
- Great for beginners to practice

### Medium Mode
- Checks for winning moves and takes them
- Blocks opponent's winning moves
- Prefers strategic positions (center, corners)
- More challenging but still beatable

### Hard Mode
- Uses the Minimax algorithm for perfect play
- Evaluates all possible game states
- Plays optimally - nearly impossible to beat!
- Best you can hope for is a draw

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **CSS3** - Animations and styling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## License

MIT

## Acknowledgments

Built with React, TypeScript, and Vite as a portfolio project demonstrating:
- Modern React patterns (hooks, functional components)
- TypeScript best practices
- Game logic and AI implementation
- CSS animations and responsive design
