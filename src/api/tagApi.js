import api from "../utils/api";

export const getAllTags  = () => api.get(`/tags`);