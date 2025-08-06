import axios from "axios";

export const bookApi = axios.create({
  baseURL: "http://localhost:6500/api/book"
});

export const fetchAllBooks = () => bookApi.get("/");
export const fetchBookById = (id) => bookApi.get(`/${id}`);
export const fetchAiSuggestion  = (id) => bookApi.get(`/${id}/ai-suggestion`);