import axios from "axios";
import type { Book } from "../types/book";

const KAKAO_API_KEY = "KakaoAK 754f098beeec4722578f8ea48bc64a58";

export const searchBooks = async (query: string): Promise<Book[]> => {
  const res = await axios.get("https://dapi.kakao.com/v3/search/book", {
    headers: { Authorization: KAKAO_API_KEY },
    params: { query, size: 50 },
  });
  return res.data.documents;
};
