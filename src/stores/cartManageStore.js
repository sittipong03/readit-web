import { create } from "zustand";
import * as cartApi from "../api/cartApi";
import useUserStore from "./userStore";

const useCartStore = create((set, get) => ({
  cart: null,
  isLoading: true,

  // Action สำหรับดึงข้อมูลตะกร้าทั้งหมด ควรเรียกใช้หลัง Login หรือเมื่อเข้าหน้าตะกร้า
  fetchCart: async () => {
    // ตรวจสอบ token จาก userStore ที่เป็นศูนย์กลาง
    const token = useUserStore.getState().token;
    if (!token) {
      console.log("No token found, user is not logged in. Cannot fetch cart.");
      set({ cart: null, isLoading: false });
      return;
    }

    try {
      set({ isLoading: true });
      // API client (axios instance) จะส่ง token ไปโดยอัตโนมัติ
      const response = await cartApi.getCart();
      // Backend จะส่งข้อมูลตะกร้าทั้งหมดกลับมา
      set({ cart: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      set({ cart: null, isLoading: false });
    }
  },

  // Action สำหรับเพิ่มสินค้าลงตะกร้า
  addToCart: async (productId, quantity) => {
    const token = useUserStore.getState().token;
    if (!token) {
        console.error("User must be logged in to add items to the cart.");
        // (ทางเลือก) อาจจะแสดงหน้าต่างให้ login ตรงนี้
        return;
    }

    try {
      // API client จะส่ง token ไปเอง
      const response = await cartApi.addToCart({ productId, quantity });
      // หลังจากเพิ่มสำเร็จ ให้อัปเดต state ในเครื่องด้วยข้อมูลตะกร้าที่ได้รับกลับมา
      set({ cart: response.data.cart });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // สามารถตั้งค่า error state ตรงนี้เพื่อแสดงข้อความใน UI ได้
    }
  },

  // Action สำหรับอัปเดตจำนวนสินค้าในตะกร้า
  updateCartItemQuantity: async (itemId, quantity) => {
    const token = useUserStore.getState().token;
    if (!token) return;

    try {
      // สมมติว่าคุณมีฟังก์ชัน updateCartItem ใน cartApi.js
      await cartApi.updateCartItem(itemId, { quantity });
      // หลังจากอัปเดตสำเร็จ ให้ดึงข้อมูลตะกร้าใหม่ทั้งหมดเพื่อความถูกต้องของข้อมูล
      await get().fetchCart();
    } catch (error)      {
        console.error("Failed to update cart item quantity:", error);
    }
  },

  // Action สำหรับลบสินค้าออกจากตะกร้า
  removeCartItem: async (itemId) => {
    const token = useUserStore.getState().token;
    if (!token) return;

    try {
      // สมมติว่าคุณมีฟังก์ชัน removeCartItem ใน cartApi.js
      await cartApi.removeCartItem(itemId);
      // หลังจากลบสำเร็จ ให้ดึงข้อมูลตะกร้าใหม่เพื่ออัปเดต UI
      await get().fetchCart();
    } catch (error) {
      console.error("Failed to remove cart item:", error);
    }
  },

  // Action สำหรับล้างข้อมูลตะกร้า มักจะถูกเรียกใช้ตอน logout
  clearCart: () => {
    set({ cart: null, isLoading: false });
  }
}));

export default useCartStore;
