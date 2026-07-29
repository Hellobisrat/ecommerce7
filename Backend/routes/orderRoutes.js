import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders
} from "../controllers/orderController.js";

import asyncHandler from "../middleware/asyncHandler.js";
import rateLimiter from "../middleware/rateLimiter.js";
import {
  validateCreateOrder
} from "../middleware/validationMiddleware.js";

const router = express.Router();

// Create order
router.post(
  "/",
  protect,
  rateLimiter,
  validateCreateOrder,
  asyncHandler(createOrder)
);

// Get logged-in user's orders
router.get(
  "/my-orders",
  protect,
  asyncHandler(getMyOrders)
);

// Get specific order (user must own it OR be admin)
router.get(
  "/:id",
  protect,
  asyncHandler(getOrderById)
);

// Admin: get all orders (with pagination)
router.get(
  "/",
  protect,
  adminOnly,
  asyncHandler(getAllOrders)
);

export default router;

