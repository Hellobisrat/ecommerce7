import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Prevent infinite redirect loop
let isRedirecting = false;
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method;

    // Avoid infinite loop
    if (isRedirecting) {
      return Promise.reject(error);
    }

    // Only redirect on 401 for protected routes
    const protectedRoutes = [
      "/products",
      "/orders",
      "/users",
    ];

    const isProtected =
      protectedRoutes.some((route) => url?.startsWith(route)) &&
      method !== "get"; // GET routes are public

    if (status === 401 && isProtected) {
      if (window.location.pathname !== "/login") {
        isRedirecting = true;
        window.location.replace("/login");
      }
    }

    if (status === 403) {
      console.warn("Admin only");
    }

    return Promise.reject(error);
  }
);

