import "./Navbar.scss";
import { useState, useEffect } from "react";
import { getYourLocationTimeInHours } from "../../api/api";

const Navbar = ({ score }) => {
  const [hour, setHour] = useState(null);
  const [greeting, setGreeting] = useState("");

  const findGreeting = () => {
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour > 12 && hour <= 6) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    getYourLocationTimeInHours().then((res) => setHour(res));
    setGreeting(findGreeting());
  }, []);

  return (
    <div className="nav">
      <h1>Score: {score}</h1>
      <p>
        {greeting}! - Guess the place with the{" "}
        <big className="nav__higher-text">higher</big> temperature
      </p>
    </div>
  );
};

export default Navbar;
