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
import { getAllTags } from "../api/tagApi.js";

const bookManageStore = create((set, get) => ({
  // --- STATE ---

  books: [],
  tags: [],
  book: null,
  userWishlist: [],
  userRead: [],
  userReading: [],
  userFavorite: [],
  isFetching: false,
  currentSearchType: "normal", // 'normal', 'ai', 'tag'
  currentSearchQuery: "",

  // State สำหรับ Normal Search (Backend-driven)
  normalBooks: [],
  page: 1,
  hasNextPage: true,
  isFetchingNormal: false,
  sortBy: "popularity",
  selectedTagIds: [],
  allTags: [],
  keyword: "",
  normalSearchStatus: "loading",

  // --- State สำหรับ AI Search (Frontend-driven) ---
  aiBooks: [],
  isFetchingAi: false,
  aiSearchStatus: "idle",

  // --- ACTIONS ---
  getBookById: async (id) => {
    const result = await fetchBookById(id);
    set({ book: result.data });
    // console.log(result);
    return result;
  },

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

  replaceSelectedTags: (newTagIds) => {
    set({ selectedTagIds: newTagIds });
  },

  // == Actions for Normal Search Tab ==
  fetchNormalBooks: async () => {
    const { sortBy, selectedTagIds, keyword } = get();
    set({
      isFetchingNormal: true,
      normalSearchStatus: "loading",
      normalBooks: [],
      page: 1,
    });
    try {
      const response = await fetchBooks({
        sortBy,
        page: 1,
        tagIds: selectedTagIds,
        keyword,
      });
      const books = response.data.books || [];

      if (books.length > 0) {
        set({
          normalBooks: books,
          hasNextPage: response.data.pagination?.hasNextPage ?? false,
          normalSearchStatus: "success",
        });
      } else {
        set({
          normalBooks: [],
          hasNextPage: false,
          normalSearchStatus: "empty", // ค้นหาแล้วแต่ไม่เจอ
        });
      }
    } catch (error) {
      console.error("Failed to fetch normal books:", error);
      set({ normalSearchStatus: "error" });
    } finally {
      set({ isFetchingNormal: false });
    }
  },

  fetchMoreNormalBooks: async () => {
    const {
      sortBy,
      selectedTagIds,
      page,
      normalBooks,
      isFetchingNormal,
      hasNextPage,
      keyword,
    } = get();
    if (isFetchingNormal || !hasNextPage) return;

    set({ isFetchingNormal: true });
    const nextPage = page + 1;
    try {
      const response = await fetchBooks({
        sortBy,
        page: nextPage,
        tagIds: selectedTagIds,
        keyword,
      });
      set({
        normalBooks: [...normalBooks, ...(response.data.books || [])],
        page: nextPage,
        hasNextPage: response.data.pagination.hasNextPage,
      });
    } catch (error) {
      console.error("Failed to fetch more books:", error);
    } finally {
      set({ isFetchingNormal: false });
    }
  },

  setSortBy: (newSortBy) => {
    set({ sortBy: newSortBy });
    // get().fetchNormalBooks(); // Fetch ใหม่เมื่อเปลี่ยนการเรียง
  },

  setSelectedTags: (tagId) => {
    const { selectedTagIds } = get();
    const newSelected = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    set({ selectedTagIds: newSelected });
    get().fetchNormalBooks(); // Fetch ใหม่เมื่อเปลี่ยน Tag
  },

  setKeyword: (newKeyword) => {
    set({ keyword: newKeyword });
    // ไม่ fetch ทันที แต่จะรอให้ user กดปุ่ม search
  },

  fetchAllTags: async () => {
    try {
      const response = await getAllTags();
      set({ allTags: response.data });
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  },

  // == Actions for AI Search Tab ==
  fetchAiBooks: async (query) => {
    set({ isFetchingAi: true, aiSearchStatus: "loading" });
    try {
      const response = await fetchBookByAI({ books: query });
      const books = response.data.books || [];

      if (books.length > 0) {
        set({ aiBooks: books, aiSearchStatus: "success" });
      } else {
        set({ aiBooks: [], aiSearchStatus: "empty" }); // ค้นหาแล้วแต่ไม่เจอ
      }
    } catch (error) {
      console.error("Failed to fetch AI books:", error);
      set({ aiBooks: [], aiSearchStatus: "error" });
    } finally {
      set({ isFetchingAi: false });
    }
  },

  clearAiBooks: () => {
    set({ aiBooks: [], aiSearchStatus: "idle" });
  },

  updateSingleBookInList: (updatedBook) => {
    set((state) => ({
      normalBooks: state.normalBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
      aiBooks: state.aiBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
    }));
  },
}));

export default bookManageStore;
