import { handleImageUpload } from "../config/imageUpload.js";
import blogModel from "../models/blog.model.js";

export const blogList = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    // const blogs = await blogModel.find({});
    const blogs = await blogModel
      .find()
      .populate("author", "username email")
      .sort({ publishedDate: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalBlogs = await blogModel.countDocuments();

    res.json({
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const blogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await blogModel
      .findById(id)
      .populate("author", "name email")
      .populate("comments");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const blogCreate = async (req, res, next) => {
  const { title, content, tags, seoTitle, seoDescription } = req.body;
  const image = req.file;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    let imageUri = null;
    if (image) {
      // Handle image compression and saving
      const filename = Date.now() + path.extname(image.originalname);
      imageUri = await handleImageUpload(image.buffer, filename);
    }

    const newBlog = new blogModel({
      title,
      content,
      author: req.user.id, // User from the authenticated JWT
      tags,
      seoTitle,
      seoDescription,
      imageUri,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const blogUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, tags, seoTitle, seoDescription } = req.body;
  const image = req.file;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (image) {
      if (blog.imageUri) {
        const oldImagePath = path.join(__dirname, "..", blog.imageUri);
        await fs.unlink(oldImagePath).catch(() => {
          console.warn("Old image not found for deletion.");
        });
      }
      const filename = Date.now() + path.extname(image.originalname);
      const imageUri = await handleImageUpload(image.buffer, filename);
      blog.imageUri = imageUri;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.seoTitle = seoTitle || blog.seoTitle;
    blog.seoDescription = seoDescription || blog.seoDescription;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const blogDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
