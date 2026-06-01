import { API } from "../api/axios";

export const cartService = {
  get: () => API.get("/cart"),
  add: (productId, quantity) =>
    API.post("/cart/add", { productId, quantity }),
  update: (productId, qty) =>
    API.put("/cart/update", { productId, qty }),
  remove: (productId) =>
    API.delete(`/cart/remove/${productId}`),
  clear: () => API.delete("/cart/clear"),
  merge: (guestCart) =>
    API.post("/cart/merge", { guestCart }),
};
