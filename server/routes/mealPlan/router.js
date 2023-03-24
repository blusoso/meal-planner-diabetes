import express from "express";
import { createMealPlan } from "./controller.js";

const router = express.Router();

router.post("/", createMealPlan);

export default router;
