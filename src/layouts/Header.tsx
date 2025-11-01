import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";
import { useTheme } from "../hooks/useTheme";
import { weatherKoreanSentence } from "../utils/weatherKoreanSentence";
import { getWeatherBackgroundImage } from "../utils/weatherBackgroundImages";
import logo from "../assets/logo/png_logo.png";
import logoDark from "../assets/logo/png_logo_dark.png";
import "../styles/header.scss";

function Header() {
  const navigate = useNavigate();
  const { weather, icon, isLoading } = useWeather();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const backgroundImage = !isLoading ? getWeatherBackgroundImage(weather) : "";

  return (
    <>
      {!isLoading && (
        <div className="header-weather-box">
          <div
            className="weather-background"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="weather-content">
            {icon && (
              <img src={icon} alt={weather} width={50} className="weather-icon" />
            )}
            <span className="today-weather-text">오늘의 날씨</span>는{" "}
            {weatherKoreanSentence[weather] || weather}
          </div>
        </div>
      )}
      <header className="header-container">
        <img
          src={isDarkMode ? logoDark : logo}
          alt="sky-bookstore Logo"
          className="header-logo"
          onClick={() => navigate("/")}
        />
        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label="다크 모드 토글"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </header>
    </>
  );
}

export default Header;
