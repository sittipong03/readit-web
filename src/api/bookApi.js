import api from "../utils/api"; // 1. เปลี่ยนมาใช้ api กลาง

// Endpoint ที่ต้องยืนยันตัวตน (เช่น wishlist) จะทำงานได้ทันที
export const getUserWishlist = () => api.get("/book/wishlist");

// Endpoint ที่ไม่ต้องยืนยันตัวตนก็ยังใช้ได้เหมือนเดิม
export const fetchAllBooks = () => api.get("/book/");
export const fetchBookById = (id) => api.get(`/book/${id}`);
export const fetchAiSuggestion = (id) => api.get(`/book/${id}/ai-suggestion`);
export const fetchBookByAI = (body) => api.post("/book/searchAI", body);
export const fetchBookByTag = (body) => api.post("/book/searchTagAI", body);
export const fetchBooks = ({ sortBy = "popularity", page = 1, limit = 24 }) => {
  const params = new URLSearchParams({
    sortBy,
    page,
    limit,
  });
  return api.get(`/book?${params.toString()}`);
};
