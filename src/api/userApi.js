import api from "../utils/api";

export const getMyProfile = () => api.get(`/auth/me`);
export const getMyFullProfile = (userId) => {
  return api.get(`/user/${userId}`);
};

export const updateUserProfile = (userId, updatedData) => {
  return api.patch(`/user/${userId}/profile`, updatedData);
};

export const updateUserPassword = (userId, passwordData) => {
  return api.patch(`/user/${userId}/password`, passwordData);
};

export const deleteMyAccount = () => {
  return api.delete("/user"); // ยิงไปที่ Endpoint ที่เราสร้างไว้
};

export const updateUserAvatarUrl = (avatarUrl) => {
  return api.patch("/user/avatar", { avatarUrl });
};

export const updateUserPreferences = (tagIds) => {
  return api.post("/user/me/preferences", { tagIds });
};

import axios from "axios";
import useUserStore from "../stores/userStore.js";

export async function checkUserHasTags() {
  const token = useUserStore.getState().token;

  try {
    const res = await axios.get("http://localhost:6500/api/book/has-tags", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.hasTags; // boolean
  } catch (error) {
    console.error("Failed to check user tags", error);
    throw error;
  }
}

