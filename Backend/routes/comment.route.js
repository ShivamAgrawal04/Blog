import express from "express";
import {
  commentAdd,
  commentsByBlogId,
} from "../controllers/comment.controller.js";
import authenticate from "../middlewares/auth.comment.js";
const router = express.Router();

router.post("/comments", authenticate, commentAdd);
router.get("/comments/:blogId", commentsByBlogId);

export default router;
