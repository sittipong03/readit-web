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
  userRead: [],
  userReading: [],
  userFavorite: [],
  getUserWishlist: async () => {
    const result = await getUserWishlist();
    console.log("result-------", result);
    set({ userWishlist: result.data });
    return result;
  },
  getUserRead: async () => {
    const result = await getUserWishlist();
    set({ userRead: result.data });
    return result;
  },
  getUserReading: async () => {
    const result = await getUserWishlist();
    set({ userReading: result.data });
    return result;
  },
  getUserFavorite: async () => {
    const result = await getUserWishlist();
    set({ userFavorite: result.data });
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
  moveBookBetweenSections: (bookId, fromShelf, toShelf) => {
    const state = get();

    //delete the book from the current shelf
    const updatedState = {
      userWishlist: state.userWishlist.filter(
        (item) => item.book?.id !== bookId,
      ),
      readingBooks: state.readingBooks.filter((b) => b.id !== bookId),
      readBooks: state.readBooks.filter((b) => b.id !== bookId),
      favoriteBooks: state.favoriteBooks.filter((b) => b.id !== bookId),
    };

    set(updatedState);
  },

  addBookToSection: (book, shelfType) => {
    const state = get();

    switch (shelfType) {
      case "WISHLIST":
        set({ userWishlist: [...state.userWishlist, { book, shelfType }] });
        break;
      case "CURRENTLY_READING":
        set({ readingBooks: [...state.readingBooks, { ...book, shelfType }] });
        break;
      case "READ":
        set({ readBooks: [...state.readBooks, { ...book, shelfType }] });
        break;
      case "FAVORITE":
        set({
          favoriteBooks: [...state.favoriteBooks, { ...book, shelfType }],
        });
        break;
    }
  },
}));

export default bookManageStore;
