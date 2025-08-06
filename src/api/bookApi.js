import axios from "axios";
import axiosInstance from "../utils/api";

export const bookApi = axios.create({
  baseURL: "http://localhost:6500/api/book",
});

export const getUserWishlist = () => axiosInstance.get("/book/wishlist");
export const fetchAllBooks = () => bookApi.get("/");
export const fetchBookById = (id) => bookApi.get(`/${id}`);
export const fetchAiSuggestion = (id) => bookApi.get(`/${id}/ai-suggestion`);
export const fetchBookByAI = (body) => bookApi.post("/searchAI", body);
