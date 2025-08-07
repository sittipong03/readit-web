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
      // State
      userId: null,
      userName: null,
      role: null,
<<<<<<< HEAD
      avatarUrl: null,
      token: null,
      fullProfile: null,
      isLoading: true,
=======
      avatarUrl: '',
      token: '',
>>>>>>> origin/feature/registerbooktag
      rememberMe: false,

      // Actions
      fetchUserProfile: async () => {
        try {
          const res = await authApi.getMe();
          const userData = res.data.result;

          set({
            userId: userData.id,
            userName: userData.name,
            role: userData.role,
            avatarUrl: userData.avatarUrl,
            fullProfile: userData,
            isLoading: false,
          });
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          get().logout();
        }
      },

      // --- FIX: เพิ่ม Action ที่ขาดไป ---
      setFullProfile: (profileData) => {
        set({ fullProfile: profileData });
      },
      // ------------------------------------

      login: async (input) => {
        const { rememberMe, ...credentials } = input;
        const result = await authApi.loginUser(credentials);
        console.log("from login " , result)
        set({
<<<<<<< HEAD
          token: result.data.accessToken,
          rememberMe: !!rememberMe,
          isLoading: true,
=======
          token: result.data.token,
          userId: result.data.userId,
          userName: result.data.user, 
          role: result.data.role,
          avatarUrl : result.data.avatarUrl ,
          rememberMe: !!rememberMe, 
>>>>>>> origin/feature/registerbooktag
        });
        await get().fetchUserProfile();
      },

      setTokenFromGoogle: async (googletoken) => {
        set({ token: googletoken, rememberMe: true, isLoading: true });
        await get().fetchUserProfile();
      },

<<<<<<< HEAD
      logout: () => {
        set({
          token: null,
          userId: null,
          userName: null,
          role: null,
          avatarUrl: null,
          rememberMe: false,
          fullProfile: null,
          isLoading: false,
        });
      },
=======
      logout: () => set({
        token: '',
        userId: null,
        userName: null,
        role: null,
        avatarUrl : "",
        rememberMe: false
      }),
>>>>>>> origin/feature/registerbooktag
    }),
    {
      name: "userState",
      storage: customStorage,
    },
  ),
);

export default useUserStore;
