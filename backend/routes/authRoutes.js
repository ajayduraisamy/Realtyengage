import express from "express";
import jwt from "jsonwebtoken";
import { loginUser, registerUser } from "../controllers/authController.js";
import User from "../models/User.js";

const router = express.Router();

// Normal register & login routes
router.post("/register", registerUser);
router.post("/login", loginUser);


router.post("/google-login", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });

if (!user) {
  user = new User({
    name: name || "Google User",
    email,
    role: "customer", 
    password: Math.random().toString(36).slice(-8),
    number: "0000000000",
  });
  await user.save();
}


    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
});

export default router;
