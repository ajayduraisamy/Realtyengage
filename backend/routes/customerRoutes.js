import express from "express";
import {
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  getProfile,
  updateProfile,
} from "../controllers/customerController.js";

import { admin, protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

 // Customer: Get and update customer
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);


// Admin: Get all customers
router.get("/", protect, admin, getAllCustomers);

// Admin/Customer: Get single customer
router.get("/:id", protect, getCustomerById);

// Admin: Update customer
router.put("/:id", protect, admin, updateCustomer);

// Admin: Delete customer
router.delete("/:id", protect, admin, deleteCustomer);



export default router;
