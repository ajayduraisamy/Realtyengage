import express from "express";
import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin: Get all customers
router.get("/", protect, admin, getAllCustomers);

// Admin/Customer: Get single customer
router.get("/:id", protect, getCustomerById);

// Admin: Update customer
router.put("/:id", protect, admin, updateCustomer);

// Admin: Delete customer
router.delete("/:id", protect, admin, deleteCustomer);

export default router;
