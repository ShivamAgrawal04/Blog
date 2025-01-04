import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only .jpg, .jpeg, and .png files are allowed."));
    }
    cb(null, true);
  },
});

export const handleImageUpload = async (buffer, filename) => {
  try {
    const outputPath = `uploads/images/${filename}`;

    // Resize the image (example: 800px width for medium screens)
    await sharp(buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 80 }) // Compress with 80% quality
      .toFile(outputPath);

    return outputPath; // Return the saved image path
  } catch (error) {
    throw new Error("Error during image processing: " + error.message);
  }
};
