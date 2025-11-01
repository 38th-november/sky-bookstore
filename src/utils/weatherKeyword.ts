export const getKeywordByWeather = (weather: string) => {
  const keywordsByWeather: Record<string, string[]> = {
    Clear: ["여행 에세이", "기분 좋은 소설", "자연 에세이"],
    Rain: ["감성 소설", "추리 소설", "철학", "심리 미스터리"],
    Snow: ["따뜻한 이야기", "겨울 로맨스", "감동 실화"],
    Clouds: ["자기계발", "명상", "에세이"],
    Thunderstorm: ["스릴러", "모험", "SF 소설"],
    Mist: ["시집", "감정 에세이", "철학서"],
  };

  const defaultKeywords = ["소설", "베스트셀러", "인기 에세이"];
  const keywords = keywordsByWeather[weather] || defaultKeywords;

  // 랜덤으로 하나 선택
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
};
