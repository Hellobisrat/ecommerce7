import { API } from "../api/axios";

export const cartService = {
  get: () => API.get("/cart"),

  add: (productId, quantity) =>
    API.post("/cart/add", { productId, quantity }),

  update: (productId, quantity) =>
    API.put("/cart/update", { productId, quantity }),

  remove: (productId) =>
    API.delete(`/cart/remove/${productId}`),

  clear: () => API.delete("/cart/clear"),
};

