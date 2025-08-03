import {create} from "zustand";
import {createProduct, getAllProduct, getProductId} from "../api/productApi";

const productManageStore = create((set, get) => ({
  products: [],
  product:[],
  getAllProduct : async() => {
    const result = await getAllProduct();
    set({products : result.data});
    return result;
  },
  addProduct : async(body) => {
    const result = await createProduct(body);
    get().getAllProduct();
    return result;
  },
  getProductId : async(id) => {
    const result = await getProductId(id);
    set({product: result.data});
    return result;
  }
}));

export default productManageStore;