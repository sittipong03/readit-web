import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authApi from "../api/authApi";

const customStorage = {
  getItem: (name) => {
    const str = localStorage.getItem(name) ?? sessionStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    const { rememberMe } = value.state;

    if (rememberMe) {
      localStorage.setItem(name, JSON.stringify(value));
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, JSON.stringify(value));
      localStorage.removeItem(name);
    }
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

const useUserStore = create(
  persist(
    (set, get) => ({
      userId: null,
      userName: null,
      role: null,
      avatarUrl: "",
      token: "",
      rememberMe: false,

      login: async (input) => {
        const { rememberMe, ...credentials } = input;
        const result = await authApi.loginUser(credentials);
        console.log("from login ", result);
        // set({
        //   token: result.data.accessToken,
        //   userId: result.data.userId,
        //   userName: result.data.user,
        //   role: result.data.role,
        // });
        set({
          token: result.data.accessToken,
          userId: result.data.userId,
          userName: result.data.user,
          role: result.data.role,
          avatarUrl: result.data.avatarUrl,
          rememberMe: !!rememberMe,
        });
        return result;
      },

      setTokenFromGoogle: async (googletoken) => {
        // 1. ตั้งค่า token ใน state ทันที
        set({ token: googletoken, rememberMe: true }); // Social login มักจะให้ remember ไว้เลย

        try {
          // 2. ใช้ token ใหม่ไปยิง API /me เพื่อดึงข้อมูล User ที่สมบูรณ์
          const res = await authApi.getMe();
          const userData = res.data.result;

          // 3. อัปเดตข้อมูล user ทั้งหมดลงใน store
          set({
            userId: userData.id,
            userName: userData.name,
            role: userData.role,
          });
        } catch (error) {
          console.error("Failed to fetch user data after Google login:", error);
          // ถ้าล้มเหลว ให้ logout เพื่อเคลียร์ token ที่อาจจะใช้ไม่ได้
          get().logout();
        }
      },

      logout: () =>
        set({
          token: "",
          userId: null,
          userName: null,
          role: null,
          avatarUrl: "",
          rememberMe: false,
        }),
    }),
    {
      name: "userState",
      // storage: customStorage,
    },
  ),
);

export default useUserStore;
