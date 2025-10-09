import express from "express";
import {
  createSupport,
  getAllSupport,
  getSupportById,
  updateSupportStatus,
  deleteSupport,
} from "../controllers/supportController.js";

import { protect, admin } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Customer: create support request
router.post("/", protect, createSupport);

// Admin: get all support requests
router.get("/", protect, admin, getAllSupport);

// Admin or Owner: get single support request
router.get("/:id", protect, getSupportById);

// Admin: update support status
router.put("/:id/status", protect, admin, updateSupportStatus);

// Admin: delete support request
router.delete("/:id", protect, admin, deleteSupport);

export default router;
