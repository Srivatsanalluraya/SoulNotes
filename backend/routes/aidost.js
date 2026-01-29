import express from "express";
import supabase from "../services/supabaseclient.js";
import { getAIDostInsight } from "../services/groqService.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    // Get last 7 days entries
    const { data, error } = await supabase
      .from("entries")
      .select("content, mood")
      .gte(
        "entry_date",
        new Date(Date.now() - 7 * 86400000)
          .toISOString()
          .split("T")[0]
      );

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.json({
        insight: "You haven’t written much this week 💙",
      });
    }

    // Combine entries
    const text = data
      .map((e) => `[${e.mood}] ${e.content}`)
      .join("\n");

    // Generate AI insight
    const insight = await getAIDostInsight(text);

    res.json({ insight });

  } catch (err) {
    console.error("AIDost Error:", err);

    res.status(500).json({
      error: "AIDost failed 😔",
    });
  }
});

export default router;
