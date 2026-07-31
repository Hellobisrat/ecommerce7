import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ⭐ REQUIRED
});

// No token interceptor needed anymore

// Handle unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // user is not authenticated
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);
