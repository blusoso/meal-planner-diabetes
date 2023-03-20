import express from "express";
import { loginRequired } from "../config/middlewares.js";
import authRoutes from "./auth/router.js";
import userRoutes from "./users/router.js";
import healthRoutes from "./health/router.js";
import nutritionRoutes from "./nutrition/router.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", loginRequired, userRoutes);
router.use("/health", loginRequired, healthRoutes);
router.use("/nutrition", loginRequired, nutritionRoutes);

export default router;
