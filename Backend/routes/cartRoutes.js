import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartControllers.js";

import asyncHandler from "../middleware/asyncHandler.js";
import rateLimiter from "../middleware/rateLimiter.js";
import {
  validateAddToCart,
  validateUpdateCart,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

// Get user cart
router.get("/", protect, asyncHandler(getCart));

// Add item to cart
router.post(
  "/add",
  protect,
  rateLimiter,
  validateAddToCart,
  asyncHandler(addToCart)
);

// Update cart item
router.put(
  "/update",
  protect,
  validateUpdateCart,
  asyncHandler(updateCartItem)
);

// Remove item
router.delete(
  "/remove/:productId",
  protect,
  asyncHandler(removeFromCart)
);

// Clear cart
router.delete(
  "/clear",
  protect,
  asyncHandler(clearCart)
);

export default router;
