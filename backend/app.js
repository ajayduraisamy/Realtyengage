import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/support", supportRoutes);

export default app;
