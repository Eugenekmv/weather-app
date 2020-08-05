import {
  GET_WEATHER,
  SET_ERROR,
  SET_CITY,
  REMOVE_CITY,
  REMOVE_ERROR,
  SET_HOURS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };

    case REMOVE_CITY:
      return { ...state, city: "" };

    case GET_WEATHER:
      return { ...state, weather: action.payload };

    case SET_ERROR:
      return { ...state, error: true };

    case REMOVE_ERROR:
      return { ...state, error: false };

    case SET_HOURS:
      return { ...state, hourly: action.payload };

    default:
      return state;
  }
};
