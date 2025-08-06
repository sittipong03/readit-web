import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:6500/api/",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (originalRequest._retry) {
        return Promise.reject(error); // Prevent infinite loop
      }
      originalRequest._retry = true;
      try {
        const response = await instance.get("auth/refresh", { _retry: true });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        return Promise.reject(error);
      }
    }
  },
);

export default instance;
