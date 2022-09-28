import "./CardContainer.scss";
import Card from "./../Card/Card";
import { useState, useEffect } from "react";
import GameOverScreen from "../GameOverScreen/GameOverScreen";
import { motion, AnimatePresence } from "framer-motion";
import cities from "../../data/cities";
import { getCityWeather, getYourLocationWeather } from "../../api/api";

const CardContainer = ({ score, setScore }) => {
  const [yourLocationWeather, setYourLocationWeather] = useState([
    {
      country: null,
      region: null,
      temperature: null,
    },
  ]);

  const [cityList, setCityList] = useState(cities);
  const [currentCity, setCurrentCity] = useState([
    {
      country: null,
      region: null,
      temperature: null,
    },
  ]);

  const [gameOver, setGameOver] = useState(false);
  const [showTemp, setShowTemp] = useState(false);

  useEffect(() => {
    getYourLocationWeather().then((res) => setYourLocationWeather(res));

    getCityWeather(cityList[cityList.length - 1]).then((result) =>
      setCurrentCity(result)
    );
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
    cityList.pop(); //remove city guessed
    getCityWeather(cityList[cityList.length - 1]).then(
      (
        res //get new city to display
      ) => setCurrentCity(res)
    );
  };

  const resetGame = () => {
    setGameOver(false);
    let newCityList = cities;
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

  const revealTemp = (temperature, id) => {
    //show temperature of city guessed for 2 seconds before moving on to the next card
    setShowTemp(true);

    setTimeout(() => {
      setShowTemp(false);

      checkIfCorrect(temperature, id);
    }, 2000);
  };

  return (
    <>
      {!gameOver ? (
        <>
          <div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="main-screen"
              >
                <Card
                  id={1}
                  country={yourLocationWeather.country}
                  region={yourLocationWeather.region}
                  temperature={yourLocationWeather.temperature}
                  clickHandler={revealTemp}
                  showTemp={true}
                ></Card>

                <Card
                  id={2}
                  country={currentCity.country}
                  region={currentCity.region}
                  temperature={currentCity.temperature}
                  clickHandler={revealTemp}
                  showTemp={showTemp}
                ></Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="gameover-screen">
          <GameOverScreen
            score={score}
            resetGameFunction={resetGame}
            gameOver={gameOver}
            resetGame={resetGame}
          ></GameOverScreen>
        </div>
      )}
    </>
  );
};

export default CardContainer;
