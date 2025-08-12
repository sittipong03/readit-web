import api from "../utils/api";

export const getAllReview = (bookId) => api.get(`/review/${bookId}`);
export const createReview = (bookId, body) => api.post(`/review/${bookId}`, body);
export const deleteReview  = (reviewId) => api.delete(`/review/${reviewId}`);
