import rateLimit from "express-rate-limit";

// 🔐 Login limiter
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts, try again later",
  },
});

// 📧 OTP limiter
export const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 3,
  message: {
    success: false,
    message: "Too many OTP requests, wait a minute",
  },
});