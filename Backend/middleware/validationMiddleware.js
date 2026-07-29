import { body, validationResult } from "express-validator";

// Global validator handler
export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

/* ============================
   AUTH VALIDATION
============================ */

export const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  handleValidation,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
];

/* ============================
   PRODUCT VALIDATION
============================ */

export const validateCreateProduct = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be positive"),
  body("category").notEmpty().withMessage("Category is required"),
  body("image").notEmpty().withMessage("Image URL is required"),
  handleValidation,
];

export const validateUpdateProduct = [
  body("price").optional().isFloat({ gt: 0 }),
  body("stock").optional().isInt({ min: 0 }),
  handleValidation,
];

/* ============================
   CART VALIDATION
============================ */

export const validateAddToCart = [
  body("productId").notEmpty().withMessage("productId is required"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  handleValidation,
];

export const validateUpdateCart = [
  body("productId").notEmpty().withMessage("productId is required"),
  body("qty")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  handleValidation,
];

/* ============================
   ORDER VALIDATION
============================ */

export const validateCreateOrder = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),

  body("shipping")
    .notEmpty()
    .withMessage("Shipping information is required"),

  body("shipping.address")
    .notEmpty()
    .withMessage("Shipping address is required"),

  body("shipping.city")
    .notEmpty()
    .withMessage("City is required"),

  body("shipping.country")
    .notEmpty()
    .withMessage("Country is required"),

  handleValidation,
];

