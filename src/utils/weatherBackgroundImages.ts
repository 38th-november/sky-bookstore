// 날씨별 배경 이미지 매핑
import imgSunny from "../assets/images/img_sunny.jpg";
import imgCloudy from "../assets/images/img_cloudy.jpg";
import imgRainy from "../assets/images/img_rainy.jpg";
import imgDrizzle from "../assets/images/img_drizzle.jpg";
import imgThunderstorm from "../assets/images/img_thunderstrom.jpg";
import imgSnow from "../assets/images/img_snow.jpg";
import imgMist from "../assets/images/img_mist.jpg";
import imgSmoke from "../assets/images/img_smoke.jpg";
import imgHaze from "../assets/images/img_haze.jpg";
import imgDust from "../assets/images/img_dust.jpg";
import imgFog from "../assets/images/img_fog.jpg";
import imgSand from "../assets/images/img_sand.jpg";
import imgAsh from "../assets/images/img_ash.jpg";
import imgSquall from "../assets/images/img_squall.jpg";
import imgTornado from "../assets/images/img_tornado.jpg";

export const weatherBackgroundImages: Record<string, string> = {
  Clear: imgSunny,
  Clouds: imgCloudy,
  Rain: imgRainy,
  Drizzle: imgDrizzle,
  Thunderstorm: imgThunderstorm,
  Snow: imgSnow,
  Mist: imgMist,
  Smoke: imgSmoke,
  Haze: imgHaze,
  Dust: imgDust,
  Fog: imgFog,
  Sand: imgSand,
  Ash: imgAsh,
  Squall: imgSquall,
  Tornado: imgTornado,
};

export const getWeatherBackgroundImage = (weather: string): string => {
  return weatherBackgroundImages[weather] || imgCloudy;
};
