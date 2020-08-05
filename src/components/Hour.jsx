import React from "react";

const Hour = ({ hours, getIcon }) => {
  return (
    <>
      {hours.map((hour, index) => (
        <div key={index} className="hourly-weather__hour">
          <span className="hour__time">
            <h4 className="hour__time_item">{hour.time}</h4>
            <span className="hour__time_item">
              {getIcon(hour.weather[0].icon)}
            </span>
          </span>
          <p className="hour__temperature">Temp: {hour.temp}°C</p>
        </div>
      ))}
    </>
  );
};

export default Hour;
