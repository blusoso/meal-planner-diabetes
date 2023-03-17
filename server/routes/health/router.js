import express from "express";
import { createHealth } from "./controller.js";

const router = express.Router();

router.post("/:userId", createHealth);

export default router;
