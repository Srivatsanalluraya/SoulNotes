import express from "express";
import { getAIDostInsight } from "../services/groqService.js";

const router = express.Router();

// POST /api/aidost/analyze
router.get("/", (req, res) => {
  res.send("AIDost is online 💙");
});

router.post("/analyze", async (req, res) => {
  try {
    const { entries } = req.body;

    if (!entries || !entries.length) {
      return res.status(400).json({
        error: "No entries provided",
      });
    }

    const insight = await getAIDostInsight(entries);

    res.json({ insight });

  } catch (err) {
    console.error("AIDost Error:", err);

    res.status(500).json({
      error: "AIDost is resting 😴 Try later.",
    });
  }
});

export default router;
