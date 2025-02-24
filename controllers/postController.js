const Post = require("../models/Post");
const User = require("../models/User");

// ✅ Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, author: req.user.id });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

// ✅ Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// ✅ Get only the logged-in user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's posts" });
  }
};

// ✅ Get posts by username
exports.getPostsByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: user._id }).populate("author", "username");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// ✅ Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};


// ✅ Delete a post (Allow Admins to Delete Any Post)
exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      // ✅ Allow admin to delete any post
      if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
      }
  
      await post.deleteOne();
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  };

// ✅ Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = { user: req.user.id, text };
    post.comments.push(comment);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

// ✅ Get all comments on a post
exports.getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments.user", "username");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// ✅ Function to Delete Any Comment (Admin Only)
exports.deleteComment = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      post.comments = post.comments.filter(comment => comment._id.toString() !== req.params.commentId);
      await post.save();
  
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment" });
    }
  };
