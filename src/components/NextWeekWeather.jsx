import React, { useState, useEffect } from "react";
import WeekDay from "./WeekDay";

const NextWeek = ({ coord, setHourly }) => {
  const [days, setDays] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      if (!coord) return;
      return (
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
          })
      );
    };

    fetchData();
  }, [coord]);

  if (!days) return null;
  return (
    <div className="week-weather">
      <WeekDay days={days} />
    </div>
  );
};

export default NextWeek;
