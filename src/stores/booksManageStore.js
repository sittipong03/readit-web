import { create } from "zustand";
import {
  getUserWishlist,
  fetchAiSuggestion,
  fetchAllBooks,
  fetchBookByAI,
  fetchBookById,
} from "../api/bookApi.js";

const bookManageStore = create((set, get) => ({
  books: [],
  book: null,
  userWishlist: [],
  getUserWishlist: async () => {
    const result = await getUserWishlist();
    console.log("result-------", result);
    set({ userWishlist: result.data });
    return result;
  },
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
  getBookByAI: async (data) => {
    console.log("dataaaa", data);
    const result = await fetchBookByAI({ books: data });
    console.log("result", result);
    set({ books: result.data.books });

    return result;
  },
  getAiSuggestion: async (id) => {
    try {
      const result = await fetchAiSuggestion(id);
      console.log('id', id)
      set((state) => ({
        book: {
          ...state.book,
          aiSuggestion: result.data.suggestion,
        },
      }));
      get().getBookById(id)
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
