import React, { useState, useEffect } from "react";

const Time = (props) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return <h1>{time}</h1>;
};

export default Time;
