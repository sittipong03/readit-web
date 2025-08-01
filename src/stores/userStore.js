import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as authApi from '../api/authApi'; 

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
      token: '',
      rememberMe: false,

      login: async (input) => {
        const { rememberMe, ...credentials } = input;
        const result = await authApi.loginUser(credentials);

        set({
          token: result.data.token,
          userId: result.data.userId,
          userName: result.data.user, 
          role: result.data.role,
          rememberMe: !!rememberMe, 
        });
        return result;
      },
      logout: () => set({
        token: '',
        userId: null,
        userName: null,
        role: null,
        rememberMe: false
      }),
    }),
    {
      name: 'userState', 
      storage: customStorage, 
    }
  )
);

export default useUserStore;