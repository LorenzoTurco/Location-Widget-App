import "./Navbar.scss";

const Navbar = ({ score }) => {
  return (
    <div className="nav">
      <h1>Score: {score}</h1>
      <p>
        Guess the place with the <big className="nav__higher-text">higher</big>{" "}
        temperature
      </p>
    </div>
  );
};

export default Navbar;
