import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";


dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email : username, password } = req.body;

    // Find user in database
    const user = await User.findOne({ username });
    // const user = await User.findById('68197a94f202e8fdc3fad47b')

    console.log(username , password); 

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(user , username , password);

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(401).json({ message: "Not authenticated" });
  }
});




export default router;
