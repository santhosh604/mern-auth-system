import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(express.json())
app.use(cors({origin: "http://localhost:5178", credentials: true}));
app.use(cookieParser());
connectDB();

//API endpoints
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running perfect`)
})