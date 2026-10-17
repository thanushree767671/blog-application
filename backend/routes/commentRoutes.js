const express = require("express");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
});

// Add comment - login required
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { text, post } = req.body;

    if (!text || !post) {
      return res.status(400).json({
        message: "Please enter a comment",
      });
    }

    const comment = await Comment.create({
      text,
      author: req.userId,
      post,
    });

    const populatedComment = await comment.populate(
      "author",
      "username"
    );

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
});

module.exports = router;