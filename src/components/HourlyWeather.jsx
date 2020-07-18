import React, { useState, useMemo } from "react";
import Hour from "./Hour";
import { fromKelToCel } from "../formulas/formulas";

const HourlyWeather = ({ hourly }) => {
  const [hours, setHours] = useState();
  const getHourly = useMemo(() => {
    if (hourly) {
      const hours = hourly
        .filter((hour) => hour.id <= 23)
        .map((hour) => {
          return {
            temp: fromKelToCel(hour.temp),
            weather: hour.weather,
            time: new Date(hour.date * 1000).toLocaleTimeString().slice(0, -3),
          };
        });
      setHours(hours);
    }
  }, [hourly]);

  return (
    <div className="hourly-weather">
      {getHourly}
      {hours ? <Hour hours={hours} /> : <p>loading...</p>}
    </div>
  );
};

export default HourlyWeather;
