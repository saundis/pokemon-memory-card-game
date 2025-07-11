function Scoreboard(props) {
  return (
    <div className="scoreboard">
      {props.gameStarted && <h1>Current Score: {props.currentScore}</h1>}
      <h1>Best Score: {props.bestScore}</h1>
    </div>
  );
}

export default Scoreboard;
