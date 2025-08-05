import axios from "axios";
import useUserStore from "../stores/userStore";

// ไฟล์นี้จะสร้าง axios instance เพื่อกำหนดและ แปะ token header ไว้เลย
console.log(import.meta.env.VITE_PORT);

const axiosInstance = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_PORT || 8899}/api`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor: ก่อนที่ request จะถูกส่ง
// ใช้สำหรับแนบ Token ไปกับทุกๆ request โดยอัตโนมัติ
axiosInstance.interceptors.request.use(
  (config) => {
    // ดึง token มาจาก localStorage (หรือที่อื่นๆ ที่คุณเก็บไว้)
    //////////////////////////////////////////////////////////////////
    //////// note ************ ตรงนี้ต้องเอา token จาก useStore มาแปะตรงนี้
    //////////////////////////////////////////////////////////////////
    let token = useUserStore.getState().token;
    if (token) {
      // ถ้ามี token ให้เพิ่ม Authorization header เข้าไป
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // หากเกิด error ตอนสร้าง request
    return Promise.reject(error);
  },
);

// ✅ Response Interceptor: หลังจากได้รับ response กลับมา
// ใช้สำหรับจัดการ Error ที่เกิดขึ้นจากฝั่ง Server แบบรวมศูนย์
axiosInstance.interceptors.response.use(
  (response) => {
    // ถ้า request สำเร็จ ก็ return response ออกไปตามปกติ
    return response;
  },
  (error) => {
    // ถ้า Server ตอบกลับมาพร้อม error
    if (error.response && error.response.status === 401) {
      // ตัวอย่าง: ถ้าเจอ Error 401 (Unauthorized) ให้ลบ token และ redirect ไปหน้า login
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("authToken");
      // window.location.href = '/login'; // สั่งให้เปลี่ยนหน้าไป /login
    }

    // ส่งต่อ error ไปให้ส่วนที่เรียกใช้ (เช่น .catch() ใน component) จัดการต่อ
    return Promise.reject(error);
  },
);

export default axiosInstance;
