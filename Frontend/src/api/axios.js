import axios from "axios";

export const API = axios.create({
baseURL: "http://localhost:5000/api",

});

// Prevent infinite redirect loop
let isRedirecting = false;

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (isRedirecting) {
      return Promise.reject(error);
    }

    // Protected routes (backend accurate)
    const protectedRoutes = [
      "/auth/me",
      "/cart",
      "/orders",
      "/products", // admin only
    ];

    const isProtected = protectedRoutes.some((route) =>
      url?.startsWith(route)
    );

    // Handle unauthorized
    if (status === 401 && isProtected) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        isRedirecting = true;
        window.location.replace("/login");
      }
    }

    // Forbidden (admin only)
    if (status === 403) {
      console.warn("Admin only route");
    }

    return Promise.reject(error);
  }
);
