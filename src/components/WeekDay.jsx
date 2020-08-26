import React from "react";
import { fromKelToCel } from "../utils/formulas";
import Loader from "./Loader";

const WeekDay = ({ days, getIcon }) => {
  const dayOfWeek = (dateDay) => {
    switch (dateDay) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";

      default:
        return "Day";
    }
  };

  const date = (day) => {
    return new Date(day.date * 1000).getUTCDate();
  };
  const dateDay = (day) => {
    return new Date(day.date * 1000).getDay();
  };

  if (!days) return <Loader />;
  return (
    <>
      {days.map((day, index) => (
        <div key={index} className="week-weather__day">
          <h4>
            {dayOfWeek(dateDay(day))}:
            <span className="day__number"> {date(day)}</span>
            <span className="day__descroption">
              {day.weather[0].description}
            </span>
          </h4>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <p>Temp: {fromKelToCel(day.temp.day)}°C</p>
            <span>{getIcon(day.weather[0].icon)}</span>
          </span>
        </div>
      ))}
    </>
  );
};

export default WeekDay;
