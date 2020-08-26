import React from "react";
import "./App.css";
import Weather from "./components/Weather";

import WeatherState from "./context/WeatherState";

function App() {
  return (
    <WeatherState>
      <Weather />
    </WeatherState>
  );
}

export default App;
