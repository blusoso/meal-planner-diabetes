import express from "express";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  res.status(200).send("Get users!");
});

export default router;
