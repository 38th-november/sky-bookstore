import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { WeatherProvider } from "./context/WeatherContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.scss";

function App() {
  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      // 카카오 JavaScript 키
      const kakaoKey = import.meta.env.VITE_KAKAO_KEY;
      window.Kakao.init(kakaoKey);
    }
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <WeatherProvider>
          <MainLayout>
            <Home />
          </MainLayout>
        </WeatherProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
