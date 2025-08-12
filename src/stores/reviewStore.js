import { create } from "zustand";
import { createReview, getAllReview } from "../api/reviewApi";

const reviewManageStore = create((set, get) => ({
  reviews: [],
  getAllReview: async (id) => {
    const result = await getAllReview(id);
    set({ reviews: result.data });
    return result;
  },
  addReview: async (id, body) => { 
    console.log("review body:", body);
    const result = await createReview(id, body); 
    console.log("review result:", result);
    return result;
  },
}));

export default reviewManageStore;
