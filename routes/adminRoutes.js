const express = require("express");
const { deleteAnyPost } = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth_middleware");
const adminMiddleware = require("../middleware/admin_middleware");

const router = express.Router();

router.delete("/posts/:id", authMiddleware, adminMiddleware, deleteAnyPost); // Admin can delete any post

module.exports = router;
