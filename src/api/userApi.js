import api from "../utils/api";

export const getMyProfile = () => api.get(`/auth/me`);
export const updateUserProfile = (userId, updatedData) => {
  return api.patch(`/user/${userId}/profile`, updatedData);
};

export const updateUserPassword = (userId, passwordData) => {
  return api.patch(`/user/${userId}/password`, passwordData);
};
