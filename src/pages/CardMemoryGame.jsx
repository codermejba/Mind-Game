import { useEffect, useState } from "react";
import "../styles/MemoryGame.css";

const cards = [
  { id: 1, value: "🧠" },
  { id: 2, value: "🧠" },
  { id: 3, value: "🎯" },
  { id: 4, value: "🎯" },
  { id: 5, value: "⚡" },
  { id: 6, value: "⚡" },
  { id: 7, value: "🧩" },
  { id: 8, value: "🧩" },
];

// Shuffle cards
const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

function CardMemoryGame() {
  const [gameCards, setGameCards] = useState(() =>
    shuffleArray(cards)
  );

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [showCards, setShowCards] = useState(true);

  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // ================================
  // SHOW CARDS FOR 2 SECONDS
  // ================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCards(false);
      setGameStarted(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // ================================
  // TIMER
  // ================================

  useEffect(() => {
    if (!gameStarted || gameWon) {
      return;
    }

    const timer = setInterval(() => {
      setTime((previousTime) => previousTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameWon]);

  // ================================
  // CHECK MATCH
  // ================================

  useEffect(() => {
    if (flippedCards.length !== 2) {
      return;
    }

    const firstCard = gameCards.find(
      (card) => card.id === flippedCards[0]
    );

    const secondCard = gameCards.find(
      (card) => card.id === flippedCards[1]
    );

    if (!firstCard || !secondCard) {
      return;
    }

    // MATCH
    if (firstCard.value === secondCard.value) {
      setMatchedCards((previousMatched) => [
        ...previousMatched,
        firstCard.id,
        secondCard.id,
      ]);

      setFlippedCards([]);
    }

    // NOT MATCH
    else {
      const timeout = setTimeout(() => {
        setFlippedCards([]);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [flippedCards, gameCards]);

  // ================================
  // CHECK WIN
  // ================================

  useEffect(() => {
    if (
      gameCards.length > 0 &&
      matchedCards.length === gameCards.length
    ) {
      setGameWon(true);
    }
  }, [matchedCards, gameCards]);

  // ================================
  // CARD CLICK
  // ================================

  const handleCardClick = (card) => {
    if (
      showCards ||
      gameWon ||
      flippedCards.length >= 2 ||
      flippedCards.includes(card.id) ||
      matchedCards.includes(card.id)
    ) {
      return;
    }

    const newFlippedCards = [
      ...flippedCards,
      card.id,
    ];

    setFlippedCards(newFlippedCards);

    // Count one move after selecting second card
    if (newFlippedCards.length === 2) {
      setMoves((previousMoves) => previousMoves + 1);
    }
  };

  // ================================
  // NEW GAME
  // ================================

  const startNewGame = () => {
    setGameCards(shuffleArray(cards));

    setFlippedCards([]);
    setMatchedCards([]);

    setShowCards(true);

    setTime(0);
    setMoves(0);

    setGameStarted(false);
    setGameWon(false);

    // Show cards for 2 seconds
    setTimeout(() => {
      setShowCards(false);
      setGameStarted(true);
    }, 2000);
  };

  // ================================
  // FORMAT TIME
  // ================================

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // ================================
  // SCORE
  // ================================

  const score = Math.max(
    1000 - moves * 50 - time * 5,
    100
  );

  // ================================
  // JSX
  // ================================

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
            Match the <span>Cards</span>
          </h1>

          <p>
            Remember the cards and find all matching
            pairs.
          </p>

        </header>

        {/* STATS */}

        <div className="memory-stats">

          <div className="stat">
            <span>Pairs</span>

            <strong>
              {matchedCards.length / 2} / 4
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
              {formatTime()}
            </strong>
          </div>

        </div>

        {/* MEMORY BOARD */}

        {!gameWon && (
          <section className="memory-board">

            {gameCards.map((card) => {

              const isFlipped =
                flippedCards.includes(card.id) ||
                matchedCards.includes(card.id) ||
                showCards;

              return (
                <button
                  key={card.id}
                  className={`memory-card ${
                    isFlipped ? "flipped" : ""
                  }`}
                  onClick={() => handleCardClick(card)}
                  aria-label="Memory card"
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

        {showCards && !gameWon && (
          <p className="preview-message">
            👀 Remember the cards...
          </p>
        )}

        {/* WIN SCREEN */}

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
              cards.
            </p>

            {/* RESULT STATS */}

            <div className="result-stats">

              <div>
                <span>Score</span>

                <strong>
                  {score}
                </strong>
              </div>

              <div>
                <span>Moves</span>

                <strong>
                  {moves}
                </strong>
              </div>

              <div>
                <span>Time</span>

                <strong>
                  {formatTime()}
                </strong>
              </div>

            </div>

            {/* PLAY AGAIN */}

            <button
              className="restart-button"
              onClick={startNewGame}
            >
              🔄 Play Again
            </button>

          </section>
        )}

        {/* NEW GAME */}

        {!gameWon && (
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

export default CardMemoryGame;