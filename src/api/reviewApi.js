import axios from "axios";

export const reviewApi = axios.create({
  baseURL: "http://localhost:6500/api/review"
});

const addToken = (token) => ({
  headers : {Authorization : `Bearer ${token}`}
})

export const getAllReview = (id) => reviewApi.get(id)
export const createReview = (id, body, token) => reviewApi.post(`/${id}`, body, addToken(token))