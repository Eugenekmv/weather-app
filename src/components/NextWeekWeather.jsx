import React, { useState, useMemo, useRef, useEffect } from "react";
import WeekDay from "./WeekDay";
import Loader from "./Loader";

const NextWeek = ({ coord, setHourly }) => {
  const [days, setDays] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getWeek = useMemo(() => {
    if (coord) {
      setIsLoading(true);
      console.log("something");
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&
        exclude=hourly,daily&appid=4426de957ef37ff3fa22377c7667eb4d`
      )
        .then((response) => response.json())
        // .then((res) => console.log(res));
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
          setHourly(hourly);
          setDays(week);

          setIsLoading(false);
        });
    } else {
      console.log("notfectchIT");
    }
  }, [coord, setHourly]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prev = usePrevious(days);

  return (
    <div className="week-weather">
      {getWeek}

      {days && days !== prev ? (
        <WeekDay days={days} />
      ) : isLoading ? (
        <Loader />
      ) : prev ? (
        <WeekDay days={days} />
      ) : null}
    </div>
  );
};

export default NextWeek;
