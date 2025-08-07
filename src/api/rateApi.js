import axios from "axios";

export const rateApi = axios.create({
  baseURL: "http://localhost:6500/api/rate",
});

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const addRate = (id, body, token) => rateApi.post(`/${id}/rating`,body, addToken(token))