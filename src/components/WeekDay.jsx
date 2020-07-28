import React from "react";
import { fromKelToCel } from "../formulas/formulas";
import Loader from "./Loader";

const WeekDay = ({ days }) => {
  const dayOfWeek = (dateDay) => {
    switch (dateDay) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";

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
        <div key={index} className="week-day">
          <h4>
            {dayOfWeek(dateDay(day))}:{" "}
            <span className="day-number">{date(day)}</span>
          </h4>
          <p>Temp: {fromKelToCel(day.temp.day)}</p>
        </div>
      ))}
    </>
  );
};

export default WeekDay;
