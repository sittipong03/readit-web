import api from "../utils/api"; // 1. เปลี่ยนมาใช้ api กลาง


export const getCart = () => api.get("/cart/");
export const addToCart = (body) => api.post("/cart/", body);
export const editCart = (body) => api.patch("/cart/", body);
