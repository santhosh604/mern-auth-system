import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({origin: "https://mern-auth-system-hazel.vercel.app", credentials: true}));
app.use(cookieParser());
connectDB();

//API endpoints
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running perfect`)
});