import type { Book } from "../types/book";
import ShareButtons from "./ShareButtons";
import "../styles/bookModal.scss";

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  weather: string;
  weatherIcon: string;
}

function BookModal({ book, isOpen, onClose, weather, weatherIcon }: BookModalProps) {
  if (!isOpen || !book) return null;

  const handleGoogleSearch = () => {
    const searchQuery = encodeURIComponent(book.title);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ✕
        </button>
        <div className="modal-body">
          <div className="modal-image-section">
            <img src={book.thumbnail} alt={book.title} />
          </div>
          <div className="modal-info-section">
            <h2 className="modal-title">{book.title}</h2>
            <div className="modal-authors">
              <span className="book-authors-title">저자명</span>
              {book.authors.join(", ") || "저자 정보 없음"}
            </div>
            <div className="modal-contents">
              <span className="book-introduce-title">책 소개</span>
              <p>{book.contents || "책 소개가 없습니다."}</p>
            </div>
            <div className="modal-actions">
              <button
                className="modal-google-button"
                onClick={handleGoogleSearch}
              >
                🔍 구글에서 검색
              </button>
              {book.url && (
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-detail-button"
                >
                  📚 상세 정보 보기
                </a>
              )}
            </div>
            <ShareButtons book={book} weather={weather} weatherIcon={weatherIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
