const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostsByUsername,
  updatePost,
  deletePost,
  addComment,
  getComments,
  getUserPosts,
  deleteComment
} = require("../controllers/postController");
const authMiddleware = require("../middleware/auth_middleware");

const router = express.Router();
const { validatePost, validateComment } = require("../middleware/validate");

router.post("/", authMiddleware, validatePost, createPost); // Create a post
router.get("/", getAllPosts); // Get all posts
router.get("/user/:username", getPostsByUsername); // Get posts by username
router.put("/:id", authMiddleware, updatePost); // Update a post
router.delete("/:id", authMiddleware, deletePost); // Delete a post

router.post("/:id/comments", authMiddleware, validateComment, addComment); // Add a comment
router.get("/:id/comments", getComments); // Get all comments for a post
router.get("/user", authMiddleware, getUserPosts);
router.delete("/:id/comments/:commentId", authMiddleware, deleteComment);

module.exports = router;
