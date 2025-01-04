import mongoose from "mongoose";
import userModel from "./user.model.js";
import commentModel from "./comment.model.js";
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel, // Reference to the User model for the author
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    imageUri: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: commentModel, // Reference to the Comment model
      },
    ],
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
