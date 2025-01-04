import userModel from "../models/user.model.js";
export const userService = async ({ name, email, password, role }) => {
  try {
    if (!name || !email || !password) {
      throw new Error("Missing required fields");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = await userModel.create({ name, email, password, role });
    return user;
  } catch (err) {
    throw new Error("Error creating user");
  }
};
