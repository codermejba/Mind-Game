import { useNavigate } from "react-router-dom";
import "./Games.css";

const games = [
  {
    id: 1,
    icon: "🧠",
    title: "Memory",
    description: "Test how well you can remember.",
    difficulty: "Easy",
  },
  {
    id: 2,
    icon: "🧩",
    title: "Logic",
    description: "Solve challenging logic problems.",
    difficulty: "Medium",
  },
  {
    id: 3,
    icon: "🎯",
    title: "Focus",
    description: "Test your speed and concentration.",
    difficulty: "Medium",
  },
  {
    id: 4,
    icon: "❓",
    title: "Quick Quiz",
    description: "Answer questions and beat your score.",
    difficulty: "Easy",
  },
];

function Games() {
  const navigate = useNavigate();
  return (
    <div className="games-page">
      <div className="games-header">
        <span className="memory-label"><span className="memory-label-dot"></span>CHOOSE YOUR CHALLENGE</span>

        <h1>
          Train Your <span>Mind</span>
        </h1>

        <p>Pick a game and challenge yourself. How high can you score?</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id}>
            <div className="game-icon">{game.icon}</div>

            <div className="game-info">
              <h2>{game.title}</h2>

              <p>{game.description}</p>

              <span className="difficulty">{game.difficulty}</span>
            </div>

            <button
              className="play-game-button"
              onClick={() => {
                if (game.title === "Memory") {
                  navigate("/games/all-memory-games");
                }
              }}
            >
              Play Game →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
