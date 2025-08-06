import axios from "axios";
import axiosInstance from "../utils/api";

export const bookApi = axios.create({
  baseURL: "http://localhost:6500/api/book",
});

export const getAllBooks = () => bookApi.get("/");
export const getUserWishlist = () => axiosInstance.get("/book/wishlist");
export const getBookById = (id) => bookApi.get(`/${id}`);
export const getBookByAI = (body) => bookApi.post("/searchAI", body);
