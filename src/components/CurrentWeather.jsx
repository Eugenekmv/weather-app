import React from "react";

const CurrentWeather = ({
  weather,
  city,
  handleCityInput,
  handleSearch,
  handleSubmit,
  myRef,
}) => {
  return (
    <React.Fragment>
      <h2>{weather.city}</h2>
      <p>Temperature: {weather.temp}</p>
      <hr />

      <p className="description">{weather.description}</p>
      <p>Pressure: {weather.pressure}</p>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleCityInput(e)}
          value={city}
          type="text"
          placeholder="Type the city"
          ref={myRef}
        />
        <button
          className="btn"
          type="submit"
          onClick={() => handleSearch(city)}>
          search
        </button>
      </form>

      {console.log(weather)}
    </React.Fragment>
  );
};

export default CurrentWeather;
