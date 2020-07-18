import React, { useState, useEffect, useRef } from "react";
import Time from "./Time";
import { fromKelToCel, pressureToMmhg } from "../formulas/formulas";

import CurrentWeather from "./CurrentWeather";
import NextWeek from "./NextWeekWeather";
import HourlyWeather from "./HourlyWeather";

const Weather = (props) => {
  const [weather, setWeather] = useState({
    city: "",
    temp: "",
    coord: "",
    about: "",
  });
  const [hourly, setHourly] = useState(null);
  const [city, setCity] = useState("");
  const myRef = useRef();

  useEffect(() => {
    const localCity = localStorage.getItem("city");
    myRef.current.focus();
    handleSearch(localCity);
  }, []);

  const handleCityInput = ({ target }) => {
    const text = target.value.toLowerCase();
    setCity(text);
  };
  const handleSearch = (city) => {
    // city !== ""
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4426de957ef37ff3fa22377c7667eb4d`
      )
        .then((response) => response.json())
        // .then((res) => console.log(res));
        .then((res) => {
          setWeather({
            city: res.name,
            temp: fromKelToCel(res.main.temp),
            pressure: pressureToMmhg(res.main.pressure),
            coord: {
              lat: res.coord.lat,
              lon: res.coord.lon,
            },
            description: res.weather[0].description,
          });
          localStorage.setItem("city", city);
        });
    } else {
      throw new Error("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity("");
    // setWeather({ ...weather, coord: null });
  };

  return (
    <div className="container">
      <div className="weather-container">
        <Time />
        <CurrentWeather
          myRef={myRef}
          city={city}
          weather={weather}
          handleCityInput={handleCityInput}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />
      </div>

      <NextWeek coord={weather.coord} setHourly={setHourly} />
      {console.log(hourly)}
      <HourlyWeather hourly={hourly} />
    </div>
  );
};

export default Weather;
