import express from "express";
import supabase from "../services/supabaseclient.js";

const router = express.Router();


// ========================
// SAVE ENTRY
// ========================
router.post("/", async (req, res) => {
  try {

    const { date, title, mood, content, userId } = req.body;


    // Validation
    if (!content || !userId) {
      return res.status(400).json({
        error: "Missing content or user",
      });
    }


    const { error } = await supabase
      .from("entries")
      .insert([
        {
          user_id: userId,   // ⭐ IMPORTANT
          entry_date: date,
          title,
          mood,
          content,
        },
      ]);


    if (error) throw error;


    res.json({ success: true });


  } catch (err) {

    console.error("Save Error:", err);

    res.status(500).json({
      error: "Save failed",
    });
  }
});


// ========================
// DELETE ENTRY
// ========================
router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const { userId } = req.query;


    if (!id) {
      return res.status(400).json({
        error: "Missing entry id",
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: "Missing userId",
      });
    }

    // Verify the entry belongs to the user
    const { data: entry, error: fetchError } = await supabase
      .from("entries")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !entry) {
      return res.status(404).json({
        error: "Entry not found",
      });
    }

    if (entry.user_id !== userId) {
      return res.status(403).json({
        error: "Not authorized to delete this entry",
      });
    }

    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id);


    if (error) throw error;


    res.json({ success: true });


  } catch (err) {

    console.error("Delete Error:", err);

    res.status(500).json({
      error: "Delete failed",
    });
  }
});


export default router;
