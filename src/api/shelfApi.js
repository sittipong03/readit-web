import api from "../utils/api";

export const getAllShelf  = () => api.get(`/book/wishlist`);