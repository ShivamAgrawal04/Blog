import express from "express";
import { seoStats } from "../controllers/sep.controller.js";
const router = express.Router();

router.get("/seo-stats", seoStats);
export default router;
