import { useNavigate } from "react-router-dom";
import "./Games.css";

const memoryGames = [
  {
    id: 1,
    title: "Card Memory",
    description: "Match the cards and test how well you can remember.",
    icon: "🧠",
    difficulty: "Easy",
    path: "/games/all-memory-games/card-memory",
  },
  {
    id: 2,
    title: "Number Sequence",
    description: "Remember the numbers and find them in the correct order.",
    icon: "🔢",
    difficulty: "Medium",
    path: "/games/all-memory-games/number-sequence",
  },
];

function AllMemoryGames() {
  const navigate = useNavigate();

  return (
    <main className="games-page">
        {/* HEADER */}
        <header className="games-header">
          <span className="memory-label">
            <span className="memory-label-dot"></span>
            MEMORY GAMES
          </span>

          <h1>
            Choose Your <span> Game</span>
          </h1>

          <p>
            Challenge your memory with different types of games and improve your
            focus.
          </p>
        </header>

        {/* GAMES */}
        <section className="games-grid">
          {memoryGames.map((game) => (
            <article className="game-card" key={game.id}>
              <div className="game-icon">{game.icon}</div>

              <div className="game-info">
                <h2>{game.title}</h2>
                <p>{game.description}</p>{" "}
                <span className="difficulty">{game.difficulty}</span>
              </div>

              <button
                className="play-game-button "
                onClick={() => navigate(game.path)}
              >
                Play Game
                <span>→</span>
              </button>
            </article>
          ))}
       
 </section>
        {/* BACK */}
        <div className="" style={{ display: "flex", justifyContent: "center"} }>
            <button className="restart-small" onClick={() => navigate("/games")}>
          ← Back to Games
        </button>
        </div>
      
    </main>
  );
}

export default AllMemoryGames;
