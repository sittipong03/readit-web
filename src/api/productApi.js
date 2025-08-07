import api from "../utils/api"; // 1. เปลี่ยนมาใช้ api กลาง

// Endpoint ที่ต้องใช้สิทธิ์ Admin (เช่น createProduct)
// จะถูกจัดการโดย Interceptor และ Middleware ที่เราทำไว้
export const createProduct = (body) => api.post(`/product/`, body);

// Endpoint ที่ไม่ต้องยืนยันตัวตน
export const getAllProduct = () => api.get(`/product/`);
export const getProductId = (id) => api.get(`/product/by-book/${id}`);
