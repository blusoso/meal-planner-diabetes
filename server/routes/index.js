import express from "express";
import { loginRequired } from "../config/middlewares.js";
// import authRoutes from './auth.js';
import authRoutes from "./auth/router.js";
import userRoutes from "./users/router.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.get("/test", loginRequired, (req, res) => res.send("connected"));

export default router;
