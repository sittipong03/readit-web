import {create} from "zustand";
import { addToCart, getCart } from "../api/cartApi";

const cartManageStore = create((set, get) => ({
  carts: [],
  getAllCart: async (token) => {
    const result = await getCart(token)
    set({ carts: result.data.carts});
    return result;
  },
  addToCart: async (body, token) => {
    const result = await addToCart(body, token);
    return result;
  }
}))

export default cartManageStore