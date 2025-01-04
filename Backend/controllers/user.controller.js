import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { userService } from "../services/user.service.js";

export const userRegister = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new admin user
    const newUser = await userService({
      name,
      email,
      password,
      role,
    });

    res
      .status(201)
      .json({ message: "Admin added successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Check if user is admin
    if (role && role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = user.generateAuthToken();
    res.cookie(
      "token",
      token
      //     , {
      //   httpOnly: true,
      //   sameSite: "strict",}
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie();
  res.status(200).json({ message: "Logged out successfully" });
};
