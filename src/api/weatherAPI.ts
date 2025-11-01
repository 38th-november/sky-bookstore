import axios from "axios";
import type { WeatherData } from "../types/weather";

const API_KEY = "425cad57070154939150b728bafbff3d";

export const getWeather = async (city: string): Promise<WeatherData> => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
  );
  return res.data;
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  );
  return res.data;
};
