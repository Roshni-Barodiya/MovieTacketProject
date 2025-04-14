const express = require("express");
const router = express.Router();
// const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models.ejs/User");

// Load environment variables
require("dotenv").config();



// 🔐 JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// =============================
// Register (POST /signup)
// =============================
router.get("/login" ,(req,res)=>{
  res.render("auth/login.ejs")
})

router.get("/signup" ,(req,res)=>{
  res.render("auth/register.ejs")
})



router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use.");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error.");
  }
});

// =============================
// Login (POST /login)
// =============================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials.");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid credentials.");

    // Create JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Redirect based on role
    if (user.role === "admin") {
      res.redirect("/admin/dashboard");
    } else {
      res.redirect("/movies");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error.");
  }
});

// =============================
// Logout (GET /logout)
// =============================
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
