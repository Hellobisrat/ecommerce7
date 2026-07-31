import { API } from "../api/axios.js";

export const ProductService = {
  getAll: () => API.get("/products"),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post("/products", data),
  update: (id, data) => API.put(`/products/${id}`, data),
  remove: (id) => API.delete(`/products/${id}`),
};
