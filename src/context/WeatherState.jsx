import React, { useReducer } from "react";
import WeatherContext from "./weatherContext";
import weatherReduser from "./weatherReduser";
import { fromKelToCel, pressureToMmhg } from "../utils/formulas";

import {
  GET_WEATHER,
  SET_ERROR,
  REMOVE_ERROR,
  SET_CITY,
  REMOVE_CITY,
  SET_HOURS,
} from "./types";

const WeatherState = (props) => {
  const initialState = {
    city: "",
    weather: {},
    error: false,
    hourly: null,
  };

  const [state, dispatch] = useReducer(weatherReduser, initialState);

  const getIcon = (icon) => {
    return (
      icon && (
        <img
          style={{ width: "50px" }}
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon-weather"
        />
      )
    );
  };

  const setHours = (payload) => {
    dispatch({ type: SET_HOURS, payload });
  };

  const setCity = ({ target }) => {
    const text = target.value.toLowerCase();
    dispatch({ type: SET_CITY, payload: text });
  };

  const submitCity = (e) => {
    e.preventDefault();
    dispatch({ type: REMOVE_CITY });
    dispatch({ type: REMOVE_ERROR });
  };

  const getWeather = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4426de957ef37ff3fa22377c7667eb4d`
    )
      .then((response) => response.json())
      .then((res) => {
        const data = {
          city: res.name,
          icon: res.weather[0].icon,
          temp: fromKelToCel(res.main.temp),
          pressure: pressureToMmhg(res.main.pressure),
          coord: {
            lat: res.coord.lat,
            lon: res.coord.lon,
          },
          description: res.weather[0].description,
        };
        dispatch({ type: GET_WEATHER, payload: data });
        localStorage.setItem("city", city);
      })
      .catch((e) => dispatch({ type: SET_ERROR }));
  };

  return (
    <WeatherContext.Provider
      value={{
        getIcon,
        setHours,
        setCity,
        getWeather,
        submitCity,
        hourly: state.hourly,
        city: state.city,
        error: state.error,
        weather: state.weather,
      }}>
      {props.children}
    </WeatherContext.Provider>
  );
};
export default WeatherState;
