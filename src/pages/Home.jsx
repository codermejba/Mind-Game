import { useNavigate } from "react-router-dom";


function BrainIcon() {
  return (
    <svg
      className="brain-icon"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45 20C37 13 25 18 25 29C16 28 10 36 14 44C7 49 10 61 18 63C15 73 23 81 33 79C36 89 49 88 53 79V27C51 24 48 21 45 20Z"
        fill="currentColor"
      />
      <path
        d="M55 20C63 13 75 18 75 29C84 28 90 36 86 44C93 49 90 61 82 63C85 73 77 81 67 79C64 89 51 88 47 79V27C49 24 52 21 55 20Z"
        fill="currentColor"
      />
      <path
        d="M48 29C41 28 37 33 39 39M30 38C35 39 37 43 35 47M22 52C28 51 32 54 32 59M39 58C45 57 48 61 48 66M53 29C59 28 63 33 61 39M70 38C65 39 63 43 65 47M78 52C72 51 68 54 68 59M61 58C55 57 52 61 52 66"
        stroke="#0B1028"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="small-icon">
      <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
    </svg>
  );
}

function Home() {
    const navigate = useNavigate();
  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <div className="logo-brain">
            <BrainIcon />
          </div>
          <span>
            Mind <strong>Game</strong>
          </span>
        </div>

        <nav>
          <a href="#home" className="active">
            Home
          </a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <button className="nav-button">
          <PlayIcon />
          Start Game
        </button>
      </header>

      {/* HERO */}
      <main id="home" className="hero">
        <section className="hero-content">
          <div className="badge">
            <span>⚡</span>
            Train Your Brain
          </div>

          <h1>
            Challenge Your
            <br />
            <span>Mind</span>
            <span className="mini-brain">🧠</span>
          </h1>

          <p>
            Sharpen your memory, improve your focus and boost your brainpower
            with fun and exciting mind games.
          </p>

          <div className="hero-buttons">
            <button className="primary-button" onClick={() => navigate("/games")}   >
              <PlayIcon />
              Start Game
            </button>

            <button className="secondary-button">
              <span>☷</span>
              How It Works
            </button>
          </div>
        </section>

        {/* BRAIN AREA */}
        <section className="brain-area">
          <div className="floating-card memory">
            <div className="card-icon memory-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <strong>Memory</strong>
          </div>

          <div className="floating-card questions">
            <div className="question-icon">?</div>
            <strong>Questions</strong>
          </div>

          <div className="floating-card logic">
            <div className="logic-icon">✚</div>
            <strong>Logic</strong>
          </div>

          <div className="floating-card focus">
            <div className="focus-icon">◎</div>
            <strong>Focus</strong>
          </div>

          <div className="brain-glow"></div>

          <div className="main-brain">
            <BrainIcon />
          </div>

          <div className="particles">
            <span className="particle p1">+</span>
            <span className="particle p2">●</span>
            <span className="particle p3">◆</span>
            <span className="particle p4">+</span>
            <span className="particle p5">●</span>
            <span className="particle p6">◆</span>
            <span className="particle p7">●</span>
          </div>
        </section>
      </main>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="feature">
          <div className="feature-icon purple">🧠</div>
          <h3>Boost Memory</h3>
          <p>Remember better, think faster.</p>
        </div>

        <div className="feature">
          <div className="feature-icon blue">🎯</div>
          <h3>Improve Focus</h3>
          <p>Stay sharp, be productive.</p>
        </div>

        <div className="feature">
          <div className="feature-icon green">💡</div>
          <h3>Build Logic</h3>
          <p>Solve problems, think deeper.</p>
        </div>

        <div className="feature">
          <div className="feature-icon orange">★</div>
          <h3>Have Fun</h3>
          <p>Learning feels better when it's a game.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="info-section">
        <span className="section-label">HOW IT WORKS</span>
        <h2>Train your brain. <span>Have fun.</span></h2>
        <p>
          Choose a game, challenge yourself, and see how high you can score.
        </p>
      </section>

      {/* ABOUT */}
      <section id="about" className="info-section about-section">
        <span className="section-label">ABOUT MIND GAME</span>
        <h2>Your daily <span>brain workout.</span></h2>
        <p>
          Mind Game is designed to make improving memory, focus and logical
          thinking simple, engaging and fun.
        </p>
      </section>
    </div>
  );
}

export default Home;