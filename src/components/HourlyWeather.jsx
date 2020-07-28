import React, { useState, useEffect } from "react";
import Hour from "./Hour";
import { fromKelToCel } from "../formulas/formulas";

const HourlyWeather = ({ hourly }) => {
  const [hours, setHours] = useState();

  useEffect(() => {
    if (hourly) {
      console.log(hourly);
      const hours = hourly
        .filter((hour) => hour.id <= 23)
        .map((hour) => {
          return {
            temp: fromKelToCel(hour.temp),
            weather: hour.weather,
            time: new Date(hour.date * 1000).toLocaleTimeString().slice(0, -3),
          };
        });
      console.log(hours);
      setHours(hours);
    } else {
      return;
    }
  }, [hourly]);

  if (!hours) return null;
  return (
    <div className="hourly-weather">
      <Hour hours={hours} />
    </div>
  );
};

export default HourlyWeather;
