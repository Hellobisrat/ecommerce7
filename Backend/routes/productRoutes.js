import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import rateLimiter from "../middleware/rateLimiter.js";
import {
  validateCreateProduct,
  validateUpdateProduct
} from "../middleware/validationMiddleware.js";

const router = express.Router();

// Public: get all products
router.get("/", asyncHandler(getProducts));

// Public: get single product
router.get("/:id", asyncHandler(getProductById));

// Admin: create product
router.post(
  "/",
  protect,
  adminOnly,
  rateLimiter,              // optional but good
  validateCreateProduct,
  asyncHandler(createProduct)
);

// Admin: update product
router.put(
  "/:id",
  protect,
  adminOnly,
  validateUpdateProduct,
  asyncHandler(updateProduct)
);

// Admin: delete product
router.delete(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(deleteProduct)
);

export default router;
