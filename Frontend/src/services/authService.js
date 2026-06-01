import { API } from "../api/axios.js";

export const authService = {
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),
  getProfile: (token) =>
    API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
