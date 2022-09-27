import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";
import CardContainer from "./Components/CardContainer/CardContainer";

const App = () => {
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      <Navbar score={score}></Navbar>
      <CardContainer score={score} setScore={setScore}></CardContainer>
    </div>
  );
};

export default App;
