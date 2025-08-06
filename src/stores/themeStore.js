import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  // Use the 'persist' middleware to save the theme in localStorage.
  // This way, the theme choice is remembered across browser sessions.
  persist(
    (set) => ({
      // Default theme is 'light'. You could also check user's system preference here.
      theme: 'light', 
      
      // Action to toggle the theme
      toggleTheme: () => 
        set((state) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
    }),
    {
      name: 'theme-storage', // Name for the item in localStorage
    }
  )
);

export default useThemeStore;