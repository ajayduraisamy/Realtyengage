import express from "express";
import { getDashboardStats } from "../controllers/adminDashboardController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin: Get dashboard stats
router.get("/", protect, admin, getDashboardStats);

export default router;
