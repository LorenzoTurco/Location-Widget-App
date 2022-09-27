import "./CardContainer.scss";
import Card from "./../Card/Card";
import { useState, useEffect } from "react";
import GameOverScreen from "../GameOverScreen/GameOverScreen";

//My location temperature (fixed) vs Location from List (changes)

const CardContainer = () => {
  //MY LOCATION WEATHER
  const [yourLocationWeather, setYourLocationWeather] = useState([
    {
      country: 0,
      region: 0,
      temperature: 0,
    },
  ]);

  //CITY LIST
  const [cityList, setCityList] = useState([
    "London",
    "Madrid",
    "Lisbon",
    "Rome",
    "Sofia",
    "Paris",
    "Vienna",
  ]);

  const [currentCity, setCurrentCity] = useState([
    {
      country: 0,
      region: 0,
      temperature: 0,
    },
  ]);

  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  let latitude;
  let longitude;

  navigator.geolocation.getCurrentPosition((position) => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
  });

  const getYourLocationWeather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}`
      );
      const data = await response.json();
      console.log(data);
      const temperature = data.current.temp_c;
      const country = data.location.country;
      const region = data.location.region;

      setYourLocationWeather({
        country: country,
        region: region,
        temperature: temperature,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getCityWeather = async (city) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}`
      );
      const data = await response.json();
      const temperature = data.current.temp_c;
      const country = data.location.country;
      const region = data.location.region;

      setCurrentCity({
        country: country,
        region: region,
        temperature: temperature,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getYourLocationWeather();
    getCityWeather(cityList[cityList.length - 1]);
  }, []);

  const checkIfCorrect = (temperatureOfCityGuessed, id) => {
    //click on the hottest city

    if (id == 1) {
      if (temperatureOfCityGuessed >= currentCity.temperature) {
        nextCard();
        return;
      }
    }
    if (id == 2) {
      if (temperatureOfCityGuessed >= yourLocationWeather.temperature) {
        nextCard();
        return;
      }
    }
    setGameOver(true);
  };

  const nextCard = () => {
    setScore(score + 1);
    cityList.pop();
    getCityWeather(cityList[cityList.length - 1]);
  };

  const resetGame = () => {
    setGameOver(false);
    let newCityList = [
      "London",
      "Madrid",
      "Lisbon",
      "Rome",
      "Sofia",
      "Paris",
      "Vienna",
    ];
    newCityList = shuffle(newCityList);
    setCityList(newCityList);
    setScore(0);
  };

  const shuffle = (arr) => {
    //Fisher-Yates Sorting Algorithm
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  return (
    <>
      {!gameOver ? (
        <>
          <span>Score: </span>
          {score}

          <div className="container">
            <Card
              id={1}
              country={yourLocationWeather.country}
              region={yourLocationWeather.region}
              temperature={yourLocationWeather.temperature}
              clickHandler={checkIfCorrect}
            ></Card>

            <Card
              id={2}
              country={currentCity.country}
              region={currentCity.region}
              temperature={currentCity.temperature}
              clickHandler={checkIfCorrect}
            ></Card>
          </div>
        </>
      ) : (
        <>
          <GameOverScreen
            score={score}
            resetGameFunction={resetGame}
          ></GameOverScreen>
        </>
      )}
    </>
  );
};

export default CardContainer;
