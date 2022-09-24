import "./WeatherContainer.scss";
import { useState, useEffect } from "react";

const WeatherComponent = () => {
  const [weather, setWeather] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const getWeather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=fee1ccbd24b142c6b56171533222409&q=${latitude},${longitude}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);

      getWeather();
    });
  }, []);
  console.log(weather);

  return (
    <div>
      <h2>Hello</h2>
      <h3>{longitude}</h3>
      <h3>{latitude}</h3>
    </div>
  );
};

export default WeatherComponent;
