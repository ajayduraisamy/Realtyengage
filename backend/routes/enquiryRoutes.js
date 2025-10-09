import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getMyEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my", protect, getMyEnquiries);
// Customer creates enquiry
router.post("/", protect, createEnquiry);

// Admin: Get all enquiries
router.get("/", protect, admin, getEnquiries);

// Admin or owner: Get single enquiry
router.get("/:id", protect, getEnquiryById);

// Admin: Update enquiry status
router.put("/:id/status", protect, admin, updateEnquiryStatus);

// Admin: Delete enquiry
router.delete("/:id", protect, admin, deleteEnquiry);

export default router;
