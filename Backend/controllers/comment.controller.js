import commentModel from "../models/comment.model.js";
import blogModel from "../models/blog.model.js";
import userModel from "../models/user.model.js";

export const commentAdd = async (req, res) => {
  const { blogId, content } = req.body;

  try {
    // Check if the blog exists
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const user = await userModel.findById(req.user.id); // Fetching user from the User model
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new comment
    const newComment = new commentModel({
      author: req.user.id, // Assuming the user is authenticated
      content,
      blogId,
    });

    // Save the comment
    await newComment.save();

    // Add the comment to the blog's comments array (optional)
    blog.comments.push(newComment._id);
    await blog.save();

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

export const commentsByBlogId = async (req, res) => {
  const { blogId } = req.params;
  try {
    // Get comments for the specified blog
    const comments = await commentModel
      .find({ blogId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    if (!comments.length) {
      return res.status(404).json({ message: "No comments found" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
