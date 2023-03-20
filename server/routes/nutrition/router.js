import express from "express";
import { createNutrition } from "./controller.js";

const router = express.Router();

router.post("/", createNutrition);

export default router;
