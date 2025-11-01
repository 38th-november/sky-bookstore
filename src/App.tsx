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

      if (!kakaoKey) {
        console.warn("VITE_KAKAO_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.");
        return;
      }

      window.Kakao.init(kakaoKey);
      console.log("Kakao SDK 초기화 완료:", window.Kakao.isInitialized());
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
