import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Weather = ({ capital }) => {

    const [weather, setWeather] = useState();

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;
        axios
            .get(requestUrl)
            .then(res => {
                setWeather(res.data);
            });
    }, [capital]);

    if (weather) {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
                <p>Wind: {weather.wind.speed} m/s</p>
                <img alt=""
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            </div>
        );
    } else {
        return <></>;
    }


};

export default Weather;
