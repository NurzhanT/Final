const Post = require("../models/Post");

// Admin can delete any post
exports.deleteAnyPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.deleteOne();
    res.json({ message: "Post deleted by admin" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};
