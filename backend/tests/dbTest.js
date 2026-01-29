import dotenv from "dotenv";
dotenv.config();

import supabase from "../services/supabaseclient.js";

async function testDB() {
  const { error } = await supabase
    .from("entries")
    .insert([
      {
        entry_date: "2026-01-29",
        title: "Test Entry",
        content: "Hello from AIDost",
        mood: "Reflective",
      },
    ]);

  if (error) console.error(error);
  else console.log("DB insert success ✅");
}

testDB();
