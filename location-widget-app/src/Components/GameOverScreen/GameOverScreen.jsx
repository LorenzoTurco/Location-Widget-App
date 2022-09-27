import "./GameOverScreen.scss";

const GameOverScreen = ({ score, resetGameFunction, gameOver, resetGame }) => {
  return (
    <>
      {gameOver ? (
        <div className="modal">
          <h3 className="modal__score">
            Your final score is: <big>{score}</big>
          </h3>
          <p className="modal__tip">
            <big>Tip:</big> Remember that different places have different
            timezones.
          </p>

          <button className="modal__button" onClick={resetGame} type="button">
            Play Again
          </button>
        </div>
      ) : null}
    </>
  );
};

export default GameOverScreen;
