import React from "react";
import "./App.css";
import Weather from "./components/Weather";

import WeatherState from "./context/WeatherState";

function App() {
  return (
    <div className="bg-image">
      <WeatherState>
        <Weather />
      </WeatherState>
    </div>
  );
}

export default App;
