import React from "react";

import CurrentWeather from "./CurrentWeather";
import NextWeek from "./NextWeekWeather";
import HourlyWeather from "./HourlyWeather";

const Weather = (props) => {
  return (
    <div className="container">
      <CurrentWeather />
      <NextWeek />
      <HourlyWeather />
    </div>
  );
};

export default Weather;
