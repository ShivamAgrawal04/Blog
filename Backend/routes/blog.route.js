import express from "express";
import {
  blogById,
  blogCreate,
  blogDelete,
  blogList,
  blogUpdate,
} from "../controllers/blog.controller.js";
import authenticate from "../middlewares/auth.admin.js";
import { upload } from "../config/imageUpload.js";
const router = express.Router();

router.get("/blogLists", blogList);

// Get a single blog by ID
router.get("/blogs/:id", blogById);

// Create a new blog (Admin only)
router.post("/blogCreate", authenticate, upload.single("image"), blogCreate);

// Update a blog (Admin only)
router.put("/blogs/:id", authenticate, upload.single("image"), blogUpdate);

// Delete a blog (Admin only)
router.delete("/blogs/:id", authenticate, blogDelete);

export default router;
