let latitude;
let longitude;

navigator.geolocation.getCurrentPosition((position) => {
  longitude = position.coords.longitude;
  latitude = position.coords.latitude;
});

export const getYourLocationWeather = async () => {
  console.log("insdie2");
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}`
    );
    const data = await response.json();
    const temperature = data.current.temp_c;
    const country = data.location.country;
    const region = data.location.region;
    console.log(data);

    return {
      country: country,
      region: region,
      temperature: temperature,
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const getCityWeather = async (city) => {
  console.log("inside3");
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}`
    );
    const data = await response.json();
    const temperature = data.current.temp_c;
    const country = data.location.country;
    const region = data.location.region;

    console.log(data);

    return {
      country: country,
      region: region,
      temperature: temperature,
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const getYourLocationTimeInHours = async () => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}`
    );
    const data = await response.json();
    const time = data.location.localtime;

    const hour = time.substr(11, 2);
    return hour;
  } catch (e) {
    console.log(e.message);
  }
};
