import api from "../utils/api";

export const addRate = async (bookId, rating) => {
  const response = await api.post(`/rating/${bookId}`, { rating }); 
  return response.data; 
};