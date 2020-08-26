import React, { useContext, useRef, useEffect, useState } from "react";
import WeatherContext from "../context/weatherContext";

import { Transition } from "react-transition-group";
import Time from "./Time";

const CurrentWeather = () => {
  const weatherContext = useContext(WeatherContext);
  const myRef = useRef();
  const [entered, setEntered] = useState(false);
  const {
    weather,
    city,
    setCity,
    getWeather,
    submitCity,
    error,
    getIcon,
  } = weatherContext;

  useEffect(() => {
    const localCity = localStorage.getItem("city");
    myRef.current.focus();
    localCity && getWeather(localCity);
    setEntered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition in={entered} timeout={300}>
      {(state) => (
        <div className={`current-weather blur ${state}`}>
          <Time />

          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <p>{weather.city}</p>
            {getIcon(weather.icon)}
          </h2>
          <p className="current-weather__temperature">
            Temperature: {weather.temp}
          </p>

          <hr />

          <p className="current-weather__description">{weather.description}</p>
          <p className="current-weather__pressure">
            {" "}
            Pressure: {weather.pressure}
          </p>

          <form className="current-weather__form" onSubmit={submitCity}>
            <input
              className="form-input"
              onChange={(e) => setCity(e)}
              value={city}
              type="text"
              placeholder={
                error ? "Please type the right city name" : "Type the city name"
              }
              ref={myRef}
            />

            {error && (
              <p style={{ color: "red" }}>Please type the right city name</p>
            )}

            <button
              className="form-btn"
              type="submit"
              onClick={() => getWeather(city)}>
              search
            </button>
          </form>
        </div>
      )}
    </Transition>
  );
};

export default CurrentWeather;
