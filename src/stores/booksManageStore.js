import { create } from "zustand";
import { getAllBooks, getBookByAI, getBookById } from "../api/bookApi.js";


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
    return result;
  },
  getBookByAI : async(data) => {
    console.log('dataaaa', data)
    const result = await getBookByAI({books:data});
    console.log("result", result);
    set({books: result.data.books});

    return result
  }
}));

export default bookManageStore;