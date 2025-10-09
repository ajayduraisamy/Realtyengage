import express from "express";
import { createPayment, getPayments, updatePayment, payMonthly, getMyPayments } from "../controllers/paymentController.js";
import { protect, admin } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// ================= User Routes =================

router.post("/", protect, createPayment);

router.get("/my", protect, getMyPayments);
// User makes monthly payment
router.put("/pay-monthly", protect, payMonthly);

// ================= Admin Routes =================
// Admin fetch all payments
router.get("/admin", protect, admin, getPayments);

// Admin updates payment (e.g., mark EMI paid)
router.put("/:id", protect, admin, updatePayment);

export default router;
