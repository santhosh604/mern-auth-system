import express from "express";
import { login, logout, newPassword, register, sendOtp, verifyOtp, profile } from "../controllers/authController.js";
import protect from "../middleware/protect.js";
import { loginLimiter, otpLimiter } from "../middleware/rateLimit.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginLimiter, login);
authRouter.post("/logout", logout);
authRouter.post("/send-otp", otpLimiter, sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", newPassword);
authRouter.get("/profile", protect, profile);

export default authRouter;