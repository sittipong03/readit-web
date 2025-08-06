import axios from "axios";

export const cartApi = axios.create({
  baseURL: "http://localhost:6500/api/cart",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getCart = (token) => cartApi.get("/", addToken(token));
export const addToCart = (body, token) =>
  cartApi.post("/", body, addToken(token));
export const editCart = (body, token) =>
  cartApi.patch("/", body, addToken(token));
