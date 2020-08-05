import React, { useState, useEffect, useContext } from "react";
import WeekDay from "./WeekDay";
import WeatherContext from "../context/weatherContext";
import Loader from "./Loader";
import { Transition } from "react-transition-group";

const NextWeek = () => {
  const [days, setDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [entered, setEntered] = useState(false);

  const weatherContext = useContext(WeatherContext);

  const {
    weather: { coord },
    setHours,
    getIcon,
  } = weatherContext;

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      if (!coord) return;
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&
           exclude=hourly,daily&appid=4426de957ef37ff3fa22377c7667eb4d`
      )
        .then((response) => response.json())

        .then((res) => {
          const week = res.daily.map((day, i) => {
            return {
              id: i,
              date: day.dt,
              temp: day.temp,
              humidity: day.humidity,
              weather: day.weather,
              pressure: day.pressure,
            };
          });
          const hourly = res.hourly.map((hour, i) => {
            return {
              id: i,
              date: hour.dt,
              temp: hour.temp,
              weather: hour.weather,
            };
          });
          setHours(hourly);
          setDays(week);

          setIsLoading(false);
          setEntered(true);
        });
    };

    fetchData();
  }, [coord]);

  if (!coord) return null;
  if (isLoading && coord) return <Loader />;
  return (
    <Transition in={entered} timeout={300}>
      {(state) => (
        <div className={`week-weather blur ${state}`}>
          {console.log(state)}
          <WeekDay days={days} getIcon={getIcon} />
        </div>
      )}
    </Transition>
  );
};

export default NextWeek;
