import { useEffect, useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { searchBooks } from "../api/bookAPI";
import { getKeywordByWeather } from "../utils/weatherKeyword";
import BookModal from "../components/BookModal";
import Advertisement from "../components/Advertisement";
import type { Book } from "../types/book";
import "../styles/home.scss";

// 배열을 랜덤하게 섞는 함수
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Home() {
  const { weather, icon, isLoading } = useWeather();
  const [books, setBooks] = useState<Book[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 날씨 정보가 로드되면 책 검색
    if (!isLoading && weather) {
      const fetchBooks = async () => {
        const keyword = getKeywordByWeather(weather);
        const bookData = await searchBooks(keyword);

        const shuffledBooks = shuffleArray(bookData);
        const selectedBooks = shuffledBooks.slice(0, 12);

        setBooks(selectedBooks);
        setVisibleCount(4); // 새로운 책 로드 시 4개로 리셋
      };
      fetchBooks();
    }
  }, [weather, isLoading]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="loading-container">날씨 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <span className="recommend-book-list-title">
        지금 날씨에 어울리는 책을 골라봤어요.
      </span>
      <ul className="recommend-book-list">
        {visibleBooks.map((book) => (
          <li key={book.url} onClick={() => handleBookClick(book)}>
            <div className="book-card-front">
              <img src={book.thumbnail} alt={book.title} width={60} />
              <span className="recommend-book-title">{book.title}</span>
              <span className="recommend-book-authors">
                {book.authors.join(", ")}
              </span>
            </div>
            <div className="book-card-hover">
              <p className="book-contents">
                {book.contents || "책 소개가 없습니다."}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        weather={weather}
        weatherIcon={icon}
      />
      {hasMore && (
        <button className="load-more-button" onClick={handleLoadMore}>
          더보기
        </button>
      )}
      <Advertisement />
    </div>
  );
}

export default Home;
