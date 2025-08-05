import { create } from "zustand";
import { getAllBooks, getBookById } from "../api/bookApi.js";


const bookManageStore = create((set,get) => ({
  books: [],
  book: null,
  getAllBooks : async() => {
    const result = await getAllBooks()
    console.log(result)
    set({books: result.data})
    return result;
  },
  getBookById : async(id) => {
    const result = await getBookById(id);
    set({book: result.data});
    // console.log(result);
    return result;
  }
}));

export default bookManageStore;