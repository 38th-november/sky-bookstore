import type { Book } from "../types/book";
import "../styles/shareButtons.scss";

interface ShareButtonsProps {
  book: Book;
  weather: string;
  weatherIcon: string;
}

function ShareButtons({ book, weather, weatherIcon }: ShareButtonsProps) {
  // 트위터 공유 핸들러
  const handleTwitterShare = () => {
    const text = `오늘 날씨는 ${weather}! 이런 날씨에는 "${book.title}"을 추천해요 📚`;
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  // 카카오톡 공유 핸들러
  const handleKakaoShare = () => {
    if (!window.Kakao) {
      alert(
        "카카오톡 공유 기능을 사용할 수 없습니다. 페이지를 새로고침 해주세요."
      );
      return;
    }

    if (!window.Kakao.isInitialized()) {
      alert("카카오 SDK가 초기화되지 않았습니다. 개발 서버를 재시작해주세요.");
      return;
    }

    try {
      // 이미지 URL을 HTTPS로 변환 (카카오는 HTTPS만 허용)
      const imageUrl = book.thumbnail.replace(/^http:/, "https:");

      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `${weather} 날씨에 어울리는 책 추천`,
          description: `"${book.title}" - ${book.authors.join(", ")}`,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } catch (error) {
      console.error("카카오톡 공유 실패:", error);

      // 에러 타입에 따른 상세 메시지
      if (error instanceof Error) {
        if (error.message.includes("domain")) {
          alert(
            "도메인이 등록되지 않았습니다.\n\n카카오 개발자 콘솔(https://developers.kakao.com)에서:\n1. 내 애플리케이션 선택\n2. 플랫폼 > Web 플랫폼 등록\n3. 사이트 도메인: http://localhost:5173"
          );
        } else {
          alert(`카카오톡 공유 실패: ${error.message}`);
        }
      } else {
        alert("카카오톡 공유에 실패했습니다. 콘솔을 확인해주세요.");
      }
    }
  };

  // 페이스북 공유 핸들러
  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  };

  // 링크 복사 핸들러
  const handleCopyLink = async () => {
    try {
      const shareText = `오늘 날씨는 ${weather}! 이런 날씨에는 "${book.title}"을 추천해요 📚\n${window.location.href}`;
      await navigator.clipboard.writeText(shareText);
      alert("링크가 복사되었습니다!");
    } catch (error) {
      console.error("링크 복사 실패:", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="share-buttons-container">
      <div className="share-title">
        <img src={weatherIcon} alt={weather} className="share-weather-icon" />
        <span>지금 날씨와 함께 공유하기</span>
      </div>
      <div className="share-buttons">
        <button
          className="share-button kakao"
          onClick={handleKakaoShare}
          title="카카오톡으로 공유"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.9-.7 3.3-.7 3.7 0 .5.2.5.4.4.2-.1 3.5-2.3 4.1-2.7.5.1.9.1 1.4.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
          </svg>
        </button>
        <button
          className="share-button twitter"
          onClick={handleTwitterShare}
          title="트위터로 공유"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          className="share-button facebook"
          onClick={handleFacebookShare}
          title="페이스북으로 공유"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button
          className="share-button link"
          onClick={handleCopyLink}
          title="링크 복사"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ShareButtons;
