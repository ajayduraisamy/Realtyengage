import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
} from "../controllers/paymentController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Customer: create payment
router.post("/", protect, createPayment);

// Admin: get all payments
router.get("/", protect, admin, getAllPayments);

// Admin or Owner: get single payment
router.get("/:id", protect, getPaymentById);

// Admin: update payment status
router.put("/:id/status", protect, admin, updatePaymentStatus);

// Admin: delete payment
router.delete("/:id", protect, admin, deletePayment);

export default router;
