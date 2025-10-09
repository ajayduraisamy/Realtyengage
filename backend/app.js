import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";

import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes

app.use("/api/admin/dashboard", adminDashboardRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/support", supportRoutes);

app.use("/api/customers", customerRoutes);


export default app;
