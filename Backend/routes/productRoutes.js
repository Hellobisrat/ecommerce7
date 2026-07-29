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

// Public routes
router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));

// Admin routes
router.post(
  "/",
  protect,
  adminOnly,
  rateLimiter,
  validateCreateProduct,
  asyncHandler(createProduct)
);

router.put(
  "/:id",
  protect,
  adminOnly,
  validateUpdateProduct,
  asyncHandler(updateProduct)
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  asyncHandler(deleteProduct)
);

export default router;



