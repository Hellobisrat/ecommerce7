import { API } from "../api/axios";

export const orderService = {
  // Create a new order
  create: (shippingInfo, items, total) =>
    API.post("/orders", { shippingInfo, items, total }),

  // Get logged-in user's orders
  getMyOrders: () => API.get("/orders/my-orders"),

  // Get a single order by ID
  getById: (id) => API.get(`/orders/${id}`),

  // Admin: get all orders
  getAll: () => API.get("/orders"),
};
