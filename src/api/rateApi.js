import api from "../utils/api";

export const createRating = ({ bookId, rating }) => {
  if (!bookId || typeof bookId === 'object') {
    console.error("Invalid bookId provided to createRating:", bookId);
    return Promise.reject(new Error("Invalid Book ID"));
  }
  return api.post(`/rate/${bookId}`, { rating });
};
