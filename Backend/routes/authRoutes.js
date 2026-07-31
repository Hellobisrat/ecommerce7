import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../middleware/validationMiddleware.js";
import rateLimiter from "../middleware/rateLimiter.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// REGISTER
router.post(
  "/register",
  validateRegister,
  asyncHandler(registerUser)
);

// LOGIN
router.post(
  "/login",
  rateLimiter,        // Prevent brute force attacks
  validateLogin,
  asyncHandler(loginUser)
);

// GET LOGGED-IN USER
// router.get(
//   "/me",
//   protect,
//   asyncHandler(getMe)
// );

export default router;
