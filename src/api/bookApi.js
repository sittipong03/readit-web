import axios from "axios";

export const bookApi = axios.create({
  baseURL: "http://localhost:6500/api/book"
});

export const getAllBooks = () => bookApi.get("/");
export const getBookById = (id) => bookApi.get(`/${id}`);