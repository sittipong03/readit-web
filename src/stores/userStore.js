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
<<<<<<< HEAD
<<<<<<< HEAD
      avatarUrl: "",
      token: "",
      fullProfile: null,
      isLoading: true,
=======
      avatarUrl: '',
      token: '',
>>>>>>> ebd5ba9 (registerbooktag)
=======
      avatarUrl: "",
      token: "",
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")
      rememberMe: false,

      login: async (input) => {
        const { rememberMe, ...credentials } = input;
        const result = await authApi.loginUser(credentials);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")
        console.log("from login ", result);
        // set({
        //   token: result.data.accessToken,
        //   userId: result.data.userId,
        //   userName: result.data.user,
        //   role: result.data.role,
        // });
<<<<<<< HEAD
=======
        console.log("from login " , result)
>>>>>>> ebd5ba9 (registerbooktag)
=======
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")
        set({
          token: result.data.accessToken,
          userId: result.data.userId,
          userName: result.data.user,
          role: result.data.role,
<<<<<<< HEAD
<<<<<<< HEAD
          avatarUrl: result.data.avatarUrl,
          rememberMe: !!rememberMe,
=======
          avatarUrl : result.data.avatarUrl ,
          rememberMe: !!rememberMe, 
>>>>>>> ebd5ba9 (registerbooktag)
=======
          avatarUrl: result.data.avatarUrl,
          rememberMe: !!rememberMe,
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")
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

<<<<<<< HEAD
<<<<<<< HEAD
      // Action สำหรับการอัปเดต profile ทั้งหมด
      setFullProfile: (profileData) =>
        set({ fullProfile: profileData, isLoading: false }),

=======
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")
      logout: () =>
        set({
          token: "",
          userId: null,
          userName: null,
          role: null,
          avatarUrl: "",
          rememberMe: false,
<<<<<<< HEAD
          fullProfile: null,
          isLoading: true,
        }),
=======
      logout: () => set({
        token: '',
        userId: null,
        userName: null,
        role: null,
        avatarUrl : "",
        rememberMe: false
      }),
>>>>>>> ebd5ba9 (registerbooktag)
=======
        }),
>>>>>>> 158eec5 (Revert "Merge branch 'dev' into feature/registerbooktag")
    }),
    {
      name: "userState",
      // storage: customStorage,
    },
  ),
);

export default useUserStore;
