const express = require("express");
const { register, loginUser, getUserProfile } = require("../controllers/userController"); // ✅ Ensure correct import
const { validateRegister, validateLogin } = require("../middleware/validate");

const authMiddleware = require("../middleware/auth_middleware");
const router = express.Router();

// ✅ User Registration Route
router.post("/register", validateRegister, register);

// ✅ User Login Route
router.post("/login", validateLogin, loginUser);

router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
