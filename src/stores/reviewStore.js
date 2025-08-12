import { create } from "zustand";
import { createReview, getAllReview, deleteReview as deleteReviewApi } from "../api/reviewApi";

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
  deleteReview: async (reviewId) => {
    try {
      await deleteReviewApi(reviewId);   
      set((state) => ({
        reviews: state.reviews.filter((review) => review.id !== reviewId),
      }));
      return true; 
    } catch (error) {
      console.error("Failed to delete review:", error);
      return false; 
    }
  },
}));

export default reviewManageStore;
