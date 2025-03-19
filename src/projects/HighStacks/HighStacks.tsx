import React, { useState, useEffect, useRef } from 'react';
import './HighStacks.css';

interface Block {
  id: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  perfect: boolean;
}

const HighStacks: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [swingDirection, setSwingDirection] = useState(1);
  const [swingPosition, setSwingPosition] = useState(0);
  const [currentBlockId, setCurrentBlockId] = useState(0);
  const [blockSpeed, setBlockSpeed] = useState(2);
  const [level, setLevel] = useState(1);
  const [blockDistance, setBlockDistance] = useState(30);
  const [difficulty, setDifficulty] = useState('medium');

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const GAME_WIDTH = 300;
  const GAME_HEIGHT = 500;
  const BLOCK_HEIGHT = 30;
  const INITIAL_BLOCK_WIDTH = 80;
  const COLORS = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#54a0ff', '#5f27cd'];
  const MAX_SWING = GAME_WIDTH - INITIAL_BLOCK_WIDTH;

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const baseBlock: Block = {
        id: 0,
        position: { x: GAME_WIDTH / 2 - INITIAL_BLOCK_WIDTH / 2, y: GAME_HEIGHT - BLOCK_HEIGHT },
        size: { width: INITIAL_BLOCK_WIDTH, height: BLOCK_HEIGHT },
        color: COLORS[0],
        perfect: true
      };
      setBlocks([baseBlock]);
      setCurrentBlockId(1);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const updateGame = () => {
      setSwingPosition((prev) => {
        let newPos = prev + blockSpeed * swingDirection;
        if (newPos > MAX_SWING) {
          newPos = MAX_SWING;
          setSwingDirection(-1);
        } else if (newPos < 0) {
          newPos = 0;
          setSwingDirection(1);
        }
        return newPos;
      });

      animationRef.current = requestAnimationFrame(updateGame);
    };

    animationRef.current = requestAnimationFrame(updateGame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameOver, swingDirection, blockSpeed]);

  useEffect(() => {
    if (blocks.length > 0 && blocks.length % 5 === 0) {
      setLevel((prevLevel) => prevLevel + 1);
      setBlockSpeed((prevSpeed) => Math.min(prevSpeed + 0.5, 8));
    }
  }, [blocks.length]);

  useEffect(() => {
    switch (difficulty) {
      case 'veryeasy':
        setBlockSpeed(1);
        break;
      case 'easy':
        setBlockSpeed(2);
        break;
      case 'medium':
        setBlockSpeed(3);
        break;
      case 'hard':
        setBlockSpeed(4);
        break;
      case 'veryhard':
        setBlockSpeed(5);
        break;
      default:
        setBlockSpeed(3);
    }
  }, [difficulty]);

  const dropBlock = () => {
    if (!gameStarted || gameOver || blocks.length === 0) return;

    const prevBlock = blocks[blocks.length - 1];
    const blockWidth = prevBlock.size.width;

    const newBlockX = swingPosition;
    const prevBlockX = prevBlock.position.x;

    const leftOverlap = Math.max(0, prevBlockX + prevBlock.size.width - newBlockX);
    const rightOverlap = Math.max(0, newBlockX + blockWidth - prevBlockX);
    const overlapWidth = Math.min(leftOverlap, rightOverlap);

    if (overlapWidth <= 0) {
      setGameOver(true);
      return;
    }

    const newWidth = Math.min(blockWidth, overlapWidth);
    const offsetX = newBlockX > prevBlockX ? 0 : blockWidth - newWidth;

    const isPerfect = Math.abs(prevBlockX - newBlockX) < 5;

    const newBlock: Block = {
      id: currentBlockId,
      position: {
        x: newBlockX + offsetX,
        y: prevBlock.position.y - BLOCK_HEIGHT
      },
      size: {
        width: isPerfect ? prevBlock.size.width : newWidth,
        height: BLOCK_HEIGHT
      },
      color: COLORS[currentBlockId % COLORS.length],
      perfect: isPerfect
    };

    const pointsEarned = isPerfect ? 10 : Math.floor(overlapWidth / blockWidth * 5);
    setScore((prev) => prev + pointsEarned);

    setBlocks((prev) => [...prev, newBlock]);
    setCurrentBlockId((prev) => prev + 1);

    if (gameAreaRef.current && newBlock.position.y < GAME_HEIGHT / 2) {
      const blocksContainer = gameAreaRef.current.querySelector('.blocks-container') as HTMLElement;
      if (blocksContainer) {
        blocksContainer.style.transform = `translateY(${GAME_HEIGHT / 2 - newBlock.position.y}px)`;
      }
    }
  };

  const restartGame = () => {
    setBlocks([]);
    setScore(0);
    setGameOver(false);
    setSwingDirection(1);
    setSwingPosition(0);
    setCurrentBlockId(0);
    setBlockSpeed(2);
    setLevel(1);
    setGameStarted(true); // Ustawienie gameStarted na true, aby ponownie zainicjować grę

    if (gameAreaRef.current) {
      const blocksContainer = gameAreaRef.current.querySelector('.blocks-container') as HTMLElement;
      if (blocksContainer) {
        blocksContainer.style.transform = 'translateY(0)';
      }
    }
  };

  return (
    <div className="high-stacks">
      <div className="game-area" ref={gameAreaRef}>
        {!gameStarted && !gameOver ? (
          <div className="start-screen">
            <h2>High Stacks</h2>
            <p>Kliknij aby upuścić blok w odpowiednim momencie!</p>
            <button className="start-button" onClick={() => setGameStarted(true)}>
              Rozpocznij grę
            </button>
          </div>
        ) : gameOver ? (
          <div className="game-over-screen">
            <h2>Koniec gry!</h2>
            <p>Twój wynik: {score}</p>
            <p>Poziom: {level}</p>
            <p>Liczba bloków: {blocks.length}</p>
            <button className="restart-button" onClick={restartGame}>
              Zagraj ponownie
            </button>
          </div>
        ) : (
          <>
            <div className="blocks-container">
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className={`block ${block.perfect ? 'perfect' : ''}`}
                  style={{
                    width: `${block.size.width}px`,
                    height: `${block.size.height}px`,
                    left: `${block.position.x}px`,
                    bottom: `${GAME_HEIGHT - block.position.y}px`,
                    backgroundColor: block.color
                  }}
                />
              ))}

              {blocks.length > 0 && (
                <div
                  className="current-block"
                  style={{
                    width: `${blocks[blocks.length - 1].size.width}px`,
                    height: `${BLOCK_HEIGHT}px`,
                    left: `${swingPosition}px`,
                    bottom: `${GAME_HEIGHT - blocks[blocks.length - 1].position.y + BLOCK_HEIGHT + blockDistance}px`,
                    backgroundColor: COLORS[currentBlockId % COLORS.length]
                  }}
                />
              )}
            </div>

            <button
              className="drop-button"
              onClick={dropBlock}
              disabled={gameOver}
            >
              UPUŚĆ!
            </button>
          </>
        )}
      </div>

      <div className="options">
        <h3>Opcje:</h3>
        <label>
          Dystans między blokami:
          <input
            type="range"
            min="15"
            max="50"
            value={blockDistance}
            onChange={(e) => setBlockDistance(parseInt(e.target.value))}
          />
        </label>
        <label>
          Poziom trudności:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="veryeasy">Bardzo Łatwy</option>
            <option value="easy">Łatwy</option>
            <option value="medium">Średni</option>
            <option value="hard">Trudny</option>
            <option value="veryhard">Bardzo Trudny</option>
          </select>
        </label>
      </div>

      <div className="instructions">
        <h3>Jak grać:</h3>
        <p>1. Kliknij przycisk "UPUŚĆ!" gdy poruszający się blok znajdzie się nad wieżą</p>
        <p>2. Staraj się umieścić blok jak najdokładniej - idealnie ułożone bloki dają więcej punktów</p>
        <p>3. Z każdym kolejnym poziomem bloki poruszają się szybciej</p>
        <p>4. Gra kończy się, gdy blok nie zostanie umieszczony na wieży</p>
      </div>
    </div>
  );
};

export default HighStacks;