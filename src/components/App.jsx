import { useState } from 'react';
import Game from './Game.jsx';
import Start from './Start.jsx';

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);

  return (
    <>
      {gameStarted ? (
        <Game
          setGameStarted={setGameStarted}
          bestScore={bestScore}
          gameStarted={gameStarted}
          setBestScore={setBestScore}
          cards={cards}
          setCards={setCards}
        />
      ) : (
        <Start
          setGameStarted={setGameStarted}
          bestScore={bestScore}
          gameStarted={gameStarted}
          setCards={setCards}
        />
      )}
    </>
  );
}

export default App;
