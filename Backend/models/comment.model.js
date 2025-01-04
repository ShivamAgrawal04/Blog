import mongoose from "mongoose";
import userModel from "./user.model.js";

// Comment Schema
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel, // Reference to the User model
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

export default commentModel;
