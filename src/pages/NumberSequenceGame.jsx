import { useEffect, useState } from "react";
import "../styles/MemoryGame.css";

const cards = [
  { id: 1, value: "1" },
  { id: 2, value: "2" },
  { id: 3, value: "3" },
  { id: 4, value: "4" },
  { id: 5, value: "5" },
  { id: 6, value: "6" },
  { id: 7, value: "7" },
  { id: 8, value: "8" },
];

// Shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
}

function NumberSequenceGame() {
  const [gameCards, setGameCards] = useState(() =>
    shuffleArray(cards)
  );

  const [moves, setMoves] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [time, setTime] = useState(60);

  const [flippedCards, setFlippedCards] = useState([]);
  const [showCards, setShowCards] = useState(true);

  const [nextNumber, setNextNumber] = useState(1);

  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  // =========================================
  // SHOW CARDS FOR 5 SECONDS
  // =========================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCards(false);
      setGameStarted(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [gameCards]);

  // =========================================
  // TIMER
  // =========================================

  useEffect(() => {
    if (!gameStarted || gameWon || gameLost) {
      return;
    }

    const interval = setInterval(() => {
      setTime((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(interval);
          setGameLost(true);
          setGameStarted(false);

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameWon, gameLost]);

  // =========================================
  // CARD CLICK
  // =========================================

  const handleCardClick = (card) => {
    if (
      showCards ||
      gameWon ||
      gameLost ||
      flippedCards.includes(card.id)
    ) {
      return;
    }

    // Count move
    setMoves((previousMoves) => previousMoves + 1);

    // Show clicked card
    const newFlippedCards = [...flippedCards, card.id];

    setFlippedCards(newFlippedCards);

    // Check if correct number
    if (card.value === String(nextNumber)) {
      const newPairs = pairs + 1;

      setPairs(newPairs);

      // Move to next number
      setNextNumber((previousNumber) => previousNumber + 1);

      // Player completed all numbers
      if (newPairs === cards.length) {
        setGameWon(true);
        setGameStarted(false);
      }

      
    } else {
      // Wrong number
      setTimeout(() => {
        setFlippedCards([]);
        setNextNumber(1);
        setPairs(0);

      }, 700);
    }
  };

  // =========================================
  // NEW GAME
  // =========================================

  const startNewGame = () => {
    setGameCards(shuffleArray(cards));

    setTime(60);
    setMoves(0);
    setPairs(0);

    setFlippedCards([]);

    setNextNumber(1);

    setShowCards(true);

    setGameWon(false);
    setGameStarted(false);
    setGameLost(false);
  };

  // =========================================
  // SCORE
  // =========================================

  const score = Math.max(
    1000 - moves * 50 - (60 - time) * 5,
    100
  );

  // =========================================
  // FORMAT TIME
  // =========================================

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <main className="memory-page">
      <div className="memory-container">

        {/* HEADER */}
        <header className="memory-header">
          <span className="memory-label">
            <span className="memory-label-dot"></span>
            MEMORY CHALLENGE
          </span>

          <h1>
            Match the <span>Numbers</span>
          </h1>

          <p>
            Remember the Numbers and find all matching
            pairs.
          </p>
        </header>

        {/* STATS */}
        <div className="memory-stats">
          <div className="stat">
            <span>Progress</span>

            <strong>
              {pairs} / 8
            </strong>
          </div>

          <div className="stat">
            <span>Moves</span>

            <strong>
              {moves}
            </strong>
          </div>

          <div className="stat">
            <span>Time</span>

            <strong>
              {formatTime(time)}
            </strong>
          </div>
        </div>

        {/* MEMORY BOARD */}
        {!gameWon && !gameLost && (
          <section className="memory-board">
            {gameCards.map((card) => {
              const isFlipped =
                flippedCards.includes(card.id) ||
                showCards;

              return (
                <button
                  key={card.id}
                  className={`memory-card ${
                    isFlipped ? "flipped" : ""
                  }`}
                  aria-label="Memory card"
                  onClick={() =>
                    handleCardClick(card)
                  }
                >
                  <span className="card-inner">

                    {/* FRONT */}
                    <span className="card-front">
                      ?
                    </span>

                    {/* BACK */}
                    <span className="card-back">
                      {card.value}
                    </span>

                  </span>
                </button>
              );
            })}
          </section>
        )}

        {/* PREVIEW MESSAGE */}
        {showCards && !gameWon && !gameLost && (
          <p className="preview-message">
            👀 Remember the numbers...
          </p>
        )}

        {/* =========================================
            WIN SCREEN
        ========================================= */}

        {gameWon && (
          <section className="memory-result">

            <div className="result-icon">
              🏆
            </div>

            <h2>
              You Did It!
            </h2>

            <p>
              Congratulations! You matched all the
              numbers.
            </p>

            <div className="result-stats">

              <div>
                <span>Score</span>
                <strong>{score}</strong>
              </div>

              <div>
                <span>Moves</span>
                <strong>{moves}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {formatTime(60 - time)}
                </strong>
              </div>

            </div>

            <button
              className="restart-button"
              onClick={startNewGame}
            >
              🔄 Play Again
            </button>

          </section>
        )}

        {/* =========================================
            LOSE SCREEN
        ========================================= */}

        {gameLost && (
          <section className="memory-result lose-result">

            <div className="result-icon">
              ⏰
            </div>

            <h2>
              Time's Up!
            </h2>

            <p>
              You ran out of time. Try again and
              improve your score!
            </p>

            <div className="result-stats">

              <div>
                <span>Score</span>
                <strong>{score}</strong>
              </div>

              <div>
                <span>Progress</span>
                <strong>
                  {pairs} / 8
                </strong>
              </div>

              <div>
                <span>Moves</span>
                <strong>
                  {moves}
                </strong>
              </div>

            </div>

            <button
              className="restart-button"
              onClick={startNewGame}
            >
              🔄 Try Again
            </button>

          </section>
        )}

        {/* NEW GAME */}
        {!gameWon && !gameLost && (
          <button
            className="restart-small"
            onClick={startNewGame}
          >
            🔄 New Game
          </button>
        )}

      </div>
    </main>
  );
}

export default NumberSequenceGame;