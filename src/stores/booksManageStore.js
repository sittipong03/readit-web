import { create } from "zustand";
import {
  fetchAiSuggestion,
  fetchAllBooks,
  fetchBookById,
} from "../api/bookApi.js";

const bookManageStore = create((set, get) => ({
  books: [],
  book: null,
  getAllBooks: async () => {
    const result = await fetchAllBooks();
    console.log(result);
    set({ books: result.data });
    return result;
  },
  getBookById: async (id) => {
    const result = await fetchBookById(id);
    set({ book: result.data });
    // console.log(result);
    return result;
  },
  getAiSuggestion: async (id) => {
    try {
      const result = await fetchAiSuggestion(id);

      set((state) => ({
        book: {
          ...state.book,
          aiSuggestion: result.data.suggestion,
        },
      }));
      return result;
    } catch (error) {
      console.error("Failed to fetch AI suggestion:", error);
      set((state) => ({
        book: {
          ...state.book,
          aiSuggestion: "Could not load AI suggestion.",
        },
      }));
    }
  },
}));

export default bookManageStore;
