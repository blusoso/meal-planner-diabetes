import express from "express";
import { updateUser } from "./controller.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  res.status(200).send("Get users!");
});
router.post("/:userId", updateUser);

export default router;
