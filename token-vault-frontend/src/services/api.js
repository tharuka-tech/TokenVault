import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7061/api",
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await axios.post(
          "https://localhost:7061/api/auth/refresh",
          { refreshToken }
        );

        localStorage.setItem("accessToken", res.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, notify the App to show the Session Expired modal
        window.dispatchEvent(new Event("session-expired"));
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;