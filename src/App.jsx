import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Games from "./pages/Games";
import NumberSequenceGame from "./pages/NumberSequenceGame";
import CardMemoryGame from "./pages/CardMemoryGame";
import AllMemoryGames from "./pages/AllMemoryGames";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/all-memory-games" element={<AllMemoryGames />} />
        <Route path="/games/all-memory-games/card-memory" element={<CardMemoryGame />} />
        <Route path="/games/all-memory-games/number-sequence" element={<NumberSequenceGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;