import express from "express";
import { createMealPlan, regenerateMealName } from "./controller.js";

const router = express.Router();

router.post("/", createMealPlan);
router.post("/regenerate-meal-name", regenerateMealName);

export default router;
