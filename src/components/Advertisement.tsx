import minidayLogo from "../assets/logo/png_logo_miniday.png";
import "../styles/advertisement.scss";

function Advertisement() {
  return (
    <div className="advertisement-container">
      <a
        href="https://38th-november.github.io/miniday"
        target="_blank"
        rel="noopener noreferrer"
        className="advertisement-link"
      >
        <div className="advertisement-content">
          <img
            src={minidayLogo}
            alt="MiniDay Logo"
            className="advertisement-logo"
          />
          <div className="advertisement-text">
            <h3 className="advertisement-title">✨ MiniDay</h3>
            <p className="advertisement-description">
              매일 작은 성취를 기록하고 공유하세요.
              <br />
              하루 5분, 나만의 미니 다이어리로 시작하는 변화!
            </p>
            <span className="advertisement-cta">지금 시작하기 →</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Advertisement;
