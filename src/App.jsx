import React from "react";
import "./App.css";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="bg-image">
      <div className="blur">
        <Weather />
      </div>
    </div>
  );
}

export default App;
