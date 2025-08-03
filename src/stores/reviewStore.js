import { create } from "zustand";
import { createReview, getAllReview } from "../api/reviewApi";

const reviewManageStore = create((set, get) => ({
  reviews: [],
  getAllReview: async(id) => {
    const result = await getAllReview(id)
    set({reviews: result.data})
    return result
  },
  addReview: async(id, body, token) => {
    console.log(id);
    const result = await createReview(id, body, token)
    console.log("resultttt",result);
    get().getAllReview(id)
    return result
  }
}));

export default reviewManageStore