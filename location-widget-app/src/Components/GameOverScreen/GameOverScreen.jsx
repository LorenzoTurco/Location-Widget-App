import "./GameOverScreen.scss";

const GameOverScreen = ({ score, resetGameFunction }) => {
  return (
    <div className="gameover-screen">
      <h1>You Lost</h1>
      <h2>Total score: {score}</h2>

      <button
        onClick={resetGameFunction}
        type="button"
        className="gameover-screen__button"
      >
        Try Again
      </button>
    </div>
  );
};

export default GameOverScreen;
