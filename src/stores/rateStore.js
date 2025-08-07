import {create} from "zustand";
import { addRate } from "../api/rateApi";

const rateManageStore = create((set, get) => ({
  rate: [],
  addRate: async(id, body, token) => {
    const result = await addRate(id, body, token)
    return result
  }
}));

export default rateManageStore;