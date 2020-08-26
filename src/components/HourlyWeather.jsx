import React, { useState, useEffect, useContext } from "react";
import Hour from "./Hour";
import { fromKelToCel } from "../utils/formulas";
import WeatherContext from "../context/weatherContext";

import { Transition } from "react-transition-group";

const HourlyWeather = () => {
  const [hours, setHours] = useState();
  const weatherContext = useContext(WeatherContext);
  const [ent, setEnt] = useState(false);

  const { hourly, getIcon } = weatherContext;

  useEffect(() => {
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
      setTimeout(() => {
        setEnt(true);
      }, 10);
      setHours(hours);
    } else {
      return;
    }
  }, [hourly]);

  if (!hours) return null;
  return (
    <Transition in={ent} timeout={1000}>
      {(state) => (
        <div className={`hourly-weather blur ${state}`}>
          <Hour hours={hours} getIcon={getIcon} />
        </div>
      )}
    </Transition>
  );
};

export default HourlyWeather;
