const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

env = process.env;

exports.register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
      
      user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };

// ✅ Login User (Fixes Password Comparison)
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

// ✅ Get User Profile & Role
exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("username role");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json({ username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };