import { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard.jsx';

const MAX_SCORE = 15;
const TIME = 60;

function Game(props) {
  const [currentScore, setCurrentScore] = useState(0);

  function randomizeCards() {
    let array = [...props.cards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleCardPress(card) {
    if (card.alreadyPressed) {
      // Game over
      props.setGameStarted(false);
      props.setCards([]);
      if (currentScore > props.bestScore) {
        props.setBestScore(currentScore);
      }
      setCurrentScore(0);
    } else {
      card.alreadyPressed = true;
      setCurrentScore((score) => score + 1);
      props.setCards(randomizeCards());
    }
  }

  return (
    <>
      <div className="header">
        <Scoreboard
          bestScore={props.bestScore}
          currentScore={currentScore}
          gameStarted={props.gameStarted}
        />
        <Timer
          gameStarted={props.gameStarted}
          setGameStarted={props.setGameStarted}
          setBestScore={props.setBestScore}
          currentScore={currentScore}
          bestScore={props.bestScore}
        />
      </div>
      <div className="game-background">
        {props.cards.map((card) => (
          <div
            className="card"
            onClick={() => handleCardPress(card)}
            key={card.id}
          >
            <img src={card.image} alt="" />
            <div className="name">{card.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Timer(props) {
  const [time, setTime] = useState(TIME);
  const gameStarted = props.gameStarted;
  const setGameStarted = props.setGameStarted;
  const setBestScore = props.setBestScore;
  const currentScore = props.currentScore;
  const bestScore = props.bestScore;

  // Timer manager
  useEffect(() => {
    if (!gameStarted) {
      return;
    }

    const timer = setInterval(() => {
      setTime((tick) => tick - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted]);

  // End checker (time over OR max score reached)
  useEffect(() => {
    if (!gameStarted) {
      setTime(60);
      return;
    } else if (time <= 0 || currentScore === MAX_SCORE) {
      setGameStarted(false);
      setTime(60);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      return;
    }
  }, [
    time,
    setGameStarted,
    setBestScore,
    currentScore,
    gameStarted,
    bestScore,
  ]);

  return (
    <>
      <div className="timer">{time}s</div>
    </>
  );
}

export default Game;
