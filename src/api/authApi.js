import api from "../utils/api" // import axios instance ที่ทำไว้

/// ตัวอย่างนะครับ 
export const loginUser = (body) => api.post(`/auth/login` , body)
export const registerUser = (body) => api.post(`/auth/register` , body)
/// แล้วไป import เข้าหน้า / component ที่ทำ