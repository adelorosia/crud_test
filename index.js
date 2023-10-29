import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/error/errorHandler.js";


dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(userRouter)

// Error Handler
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
