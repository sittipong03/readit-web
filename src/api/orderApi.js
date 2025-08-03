import axios from "axios";
import api from "../utils/api";

export const getMyPurchaseHistory = () => {
  return api.get("/order");
};
export const getOrderDetail = (orderId) => api.get(`/order/${orderId}`);
