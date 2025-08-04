import axios from "axios";

export const productApi = axios.create({
  baseURL: "http://localhost:6500/api/product"
});

// const addToken = (token) => ({
//   headers : {Authorization : `Bearer ${token}`}
// });

export const createProduct = (body) => productApi.post(`/`, body);
export const getAllProduct = () => productApi.get(`/`);
export const getProductId = (id) => productApi.get(`/by-book/${id}`);
