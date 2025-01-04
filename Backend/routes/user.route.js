import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/logout", userLogout);

export default router;
