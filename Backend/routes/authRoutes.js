import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../middleware/validationMiddleware.js";
import rateLimiter from "../middleware/rateLimiter.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// Register
router.post(
  "/register",
  validateRegister,
  asyncHandler(registerUser)
);

// Login
router.post(
  "/login",
  rateLimiter,        // Prevent brute force
  validateLogin,
  asyncHandler(loginUser)
);

// Get logged-in user
router.get(
  "/me",
  protect,
  asyncHandler(getMe)
);

export default router;
