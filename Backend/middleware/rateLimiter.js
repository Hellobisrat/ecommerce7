import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,             // limit each IP
  message: "Too many requests, please try again later."
});

export default rateLimiter;
