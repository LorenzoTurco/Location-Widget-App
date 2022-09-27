import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import WeatherContainer from "./Components/WeatherContainer/WeatherContainer";
import CardContainer from "./Components/CardContainer/CardContainer";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <CardContainer></CardContainer>
    </div>
  );
}

export default App;
