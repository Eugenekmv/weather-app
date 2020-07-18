import React from "react";

const Hour = ({ hours }) => {
  return (
    <>
      {hours.map((hour, index) => (
        <div key={index} className="hour">
          <h4>{hour.time}</h4>
          <p>Temp: {hour.temp}</p>
        </div>
      ))}
    </>
  );
};

export default Hour;
