/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getWeather, getWeatherByCoords } from "../api/weatherAPI";
import type { WeatherData } from "../types/weather";

interface WeatherContextType {
  weather: string;
  icon: string;
  isLoading: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [weather, setWeather] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async (weatherData: WeatherData) => {
      const mainWeather = weatherData.weather[0].main;
      const iconCode = weatherData.weather[0].icon;

      setWeather(mainWeather);
      setIcon(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
      setIsLoading(false);
    };

    // 사용자 위치 기반 날씨 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByCoords(latitude, longitude);
          fetchWeather(weatherData);
        },
        async (error) => {
          console.warn("위치 정보를 가져올 수 없습니다:", error.message);
          const weatherData = await getWeather("Seoul");
          fetchWeather(weatherData);
        }
      );
    } else {
      const fetchDefaultWeather = async () => {
        const weatherData = await getWeather("Seoul");
        fetchWeather(weatherData);
      };
      fetchDefaultWeather();
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, icon, isLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};
