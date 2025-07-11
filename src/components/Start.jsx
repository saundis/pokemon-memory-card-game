import { useEffect } from 'react';
import Scoreboard from './Scoreboard';
import title from '../images/download.png';

// Up until Gen V
const pokemonCount = 500;
const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';
const CARDS_AMOUNT = 15;
const card = {
  alreadyPressed: false,
  image: null,
  name: '',
  id: null,
};

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}

function Start(props) {
  // The cards are set up on the start screen so that there's no wait for the async stuff
  const setCards = props.setCards;
  const gameStarted = props.gameStarted;

  // Setting up the cards array originally
  useEffect(() => {
    if (gameStarted) {
      setCards([]);
      return;
    }
    let cardsArray = [];
    for (let i = 0; i < CARDS_AMOUNT; i++) {
      cardsArray.push({ ...card });
    }
    setImages(cardsArray).finally(() => setCards(cardsArray));
  }, [gameStarted, setCards]);

  async function setImages(cardsArray) {
    try {
      let alreadyPicked = [];
      for (let i = 0; i < cardsArray.length; i++) {
        let pokemonID;
        do {
          pokemonID = Math.floor(Math.random() * pokemonCount);
        } while (alreadyPicked.includes(pokemonID) || pokemonID <= 0);
        alreadyPicked.push(pokemonID);
        cardsArray[i].id = pokemonID;
      }

      let data = await Promise.all(
        cardsArray.map((card) => {
          console.log(card);
          return fetch(pokemonURL + card.id).then((response) =>
            response.json()
          );
        })
      );

      for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].image =
          data[i].sprites.other['official-artwork'].front_default;
        cardsArray[i].name = data[i].name;
      }
      await Promise.all(cardsArray.map((card) => preloadImage(card.image)));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Scoreboard bestScore={props.bestScore} gameStarted={props.gameStarted} />
      <div className="background">
        <div className="title-div">
          <img src={title} alt="Pokemon Memory Game" />
        </div>
        <div className="instructions">
          <h2>How to play:</h2>
          <ol>
            <li>
              You will be given a set of 15 unique cards. You must click on each
              card only once.
            </li>
            <li>
              After each click, the board will be randomized. You must remember
              all the previous cards you've clicked.
            </li>
            <li>
              You only have 60 seconds to finish. The timer and current score
              will be displayed on the top right.
            </li>
          </ol>
        </div>
        <button className="start" onClick={() => props.setGameStarted(true)}>
          Start
        </button>
      </div>
    </>
  );
}

export default Start;
