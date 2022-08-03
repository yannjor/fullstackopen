import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;
    axios.get(requestUrl).then((response) => setWeather(response.data));
  }, [capital]);

  if (weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
        <img
          alt="Weather icon"
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        ></img>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    );
  }
};

export default Weather;
