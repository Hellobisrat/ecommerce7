import { body } from "express-validator";

export const validateCreateProduct = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be positive"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be >= 0"),
];

export const validateUpdateProduct = [
  body("price").optional().isFloat({ gt: 0 }),
  body("stock").optional().isInt({ min: 0 }),
];
