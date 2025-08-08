import { create } from "zustand";
import {
  getUserWishlist,
  fetchAiSuggestion,
  fetchAllBooks,
  fetchBookByAI,
  fetchBookById,
  fetchBookByTag,
  fetchBooks,
} from "../api/bookApi.js";

const bookManageStore = create((set, get) => ({
  books: [],
  tags: [],
  book: null,
  userWishlist: [],
  userRead: [],
  userReading: [],
  userFavorite: [],
  page: 1,
  hasNextPage: true,
  isFetching: false,
  sortBy: "popularity",
  currentSearchType: "normal", // 'normal', 'ai', 'tag'
  currentSearchQuery: "",
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
  getBookByTag: async (data) => {
    // console.log(data);
    const result = await fetchBookByTag({ books: data });
    console.log("result", result);
    set({ books: result.data.books });
    return result;
  },
  getAiSuggestion: async (id) => {
    try {
      const result = await fetchAiSuggestion(id);
      console.log("id", id);
      set((state) => ({
        book: {
          ...state.book,
          aiSuggestion: result.data.suggestion,
        },
      }));
      get().getBookById(id);
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
  setSortByAndFetch: async (newSortBy) => {
    set({
      books: [],
      page: 1,
      sortBy: newSortBy,
      isFetching: true,
    });
    try {
      const response = await api.get(
        `/book?sortBy=${newSortBy}&page=1&limit=24`,
      );
      set({
        books: response.data.books,
        hasNextPage: response.data.pagination.hasNextPage,
        isFetching: false,
      });
    } catch (error) {
      console.error("Failed to fetch initial books:", error);
      set({ isFetching: false });
    }
  },
  fetchNewBooks: async (options = {}) => {
    // กำหนดค่า default และรับค่าใหม่
    const { type = "normal", query = "", sortBy = get().sortBy } = options;

    set({ isFetching: true, books: [], page: 1, hasNextPage: true });

    try {
      let response;
      if (type === "ai") {
        response = await fetchBookByAI({ books: query });
        set({ currentSearchType: "ai", currentSearchQuery: query });
      } else if (type === "tag") {
        response = await fetchBookByTag({ books: query });
        set({ currentSearchType: "tag", currentSearchQuery: query });
      } else {
        // การค้นหาปกติ (พร้อม sorting)
        response = await fetchBooks({ sortBy, page: 1 });
        set({ currentSearchType: "normal", sortBy });
      }

      set({
        books: response.data.books,
        hasNextPage: response.data.pagination?.hasNextPage ?? false, // ใช้ optional chaining และกำหนด default
      });
    } catch (error) {
      console.error(`Failed to fetch new books for type "${type}":`, error);
      set({ hasNextPage: false }); // หยุดการโหลดเมื่อมี error
    } finally {
      set({ isFetching: false });
    }
  },
  fetchMoreBooks: async () => {
    const {
      isFetching,
      hasNextPage,
      page,
      books,
      currentSearchType,
      currentSearchQuery,
      sortBy,
    } = get();

    if (isFetching || !hasNextPage) return;

    set({ isFetching: true });
    const nextPage = page + 1;

    try {
      let response;
      // การโหลดเพิ่มจะขึ้นอยู่กับประเภทการค้นหาล่าสุด
      if (currentSearchType === "normal") {
        response = await fetchBooks({ sortBy, page: nextPage });
      } else {
        // Backend ปัจจุบันของคุณยังไม่รองรับ pagination สำหรับ AI/Tag search
        // ดังนั้นส่วนนี้จะยังไม่ทำงาน แต่เตรียมโครงสร้างไว้
        console.log("Pagination for AI/Tag search is not yet supported.");
        set({ hasNextPage: false });
        return;
      }

      set({
        books: [...books, ...response.data.books],
        page: nextPage,
        hasNextPage: response.data.pagination.hasNextPage,
      });
    } catch (error) {
      console.error("Failed to fetch more books:", error);
      set({ hasNextPage: false });
    } finally {
      set({ isFetching: false });
    }
  },
  setSortBy: (newSortBy) => {
    set({ sortBy: newSortBy });
    get().fetchNewBooks({ type: "normal", sortBy: newSortBy });
  },
}));

export default bookManageStore;
