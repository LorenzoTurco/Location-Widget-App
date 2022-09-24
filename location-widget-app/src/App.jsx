import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import WeatherContainer from "./Components/WeatherContainer/WeatherContainer";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <WeatherContainer></WeatherContainer>
    </div>
  );
}

export default App;
