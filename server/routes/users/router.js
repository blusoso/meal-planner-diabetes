import express from "express";
import { getUser, updateUser } from "./controller.js";

const router = express.Router();

router.get("/:userId", getUser);
router.post("/:userId", updateUser);

export default router;
