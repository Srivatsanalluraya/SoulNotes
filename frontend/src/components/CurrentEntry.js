import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


// Prompts
const prompts = [
  "What is on your mind today?",
  "How are you feeling right now?",
  "What made you smile today?",
  "What challenged you today?",
  "What are you grateful for today?",
  "Write freely. This space is yours.",
  "What would you like to remember about today?",
];

export default function CurrentEntry({ mood, setMood, theme, setRefreshKey, user}) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");

  // Fallback theme (prevents crash)
  const safeTheme = theme || {
    primary: "#0d6efd",
  };

  // Set date + prompt
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);

    const random =
      prompts[Math.floor(Math.random() * prompts.length)];

    setPrompt(random);
  }, []);

  // Save entry
  const handleSave = async () => {
    if (!user?.id) {
      alert("Please log in to save entries");
      return;
    }
    if (!content.trim()) {
      alert("Write something first ✍️");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/entries`, {
        date,
        title,
        mood,
        content,
        userId: user.id,
      });

      alert("Saved 💙");

      setTitle("");
      setContent("");
      setRefreshKey((prev) => prev + 1);

    } catch (err) {
      console.error(err);
      alert("Save failed 😔");
    }
  };

  return (
    <div className="container py-5">

      {/* Diary Page */}
      <div
        className="mx-auto shadow-lg p-5"
        style={{
          maxWidth: "1000px",
          backgroundColor: "#fffdf7",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          fontFamily: "Georgia, serif",
        }}
      >

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">📖 My Diary</h2>

          <p className="text-muted fst-italic">
            {prompt}
          </p>
        </div>

        {/* Date + Mood */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <span className="fw-semibold">
            Date: {date}
          </span>

          <span
            className="fst-italic"
            style={{ color: safeTheme.primary }}
          >
            Mood: {mood}
          </span>
        </div>

        <hr />

        {/* Mood Selector */}
        <div className="mb-4">

          <label className="form-label fw-semibold mb-2">
            Mood
          </label>

          <div
            className="d-flex flex-wrap align-items-center"
            style={{
              gap: "6px",
              fontSize: "14px",
              userSelect: "none",
            }}
          >
            {[
              "Reflective",
              "Emotional",
              "Casual",
              "Happy",
              "Stressed",
              "Low",
              "Motivated",
              "Grateful",
            ].map((m, i, arr) => (
              <React.Fragment key={m}>

                {/* Mood Button */}
                <span
                  onClick={() => setMood(m)}
                  style={{
                    cursor: "pointer",

                    minWidth: "90px",
                    textAlign: "center",
                    display: "inline-block",

                    padding: "6px 4px",

                    color:
                      mood === m
                        ? safeTheme.primary
                        : "#555",

                    background:
                      mood === m
                        ? `${safeTheme.primary}15`
                        : "transparent",

                    borderBottom: `2px solid ${
                      mood === m
                        ? safeTheme.primary
                        : "transparent"
                    }`,

                    fontWeight: "500",

                    transition: "all 0.2s ease",
                  }}
                >
                  {m}
                </span>

                {/* Separator */}
                {i < arr.length - 1 && (
                  <span style={{ color: "#aaa" }}>|</span>
                )}

              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control border-0 fs-4 fw-semibold"
            placeholder="Title of today..."
            style={{
              background: "transparent",
              outline: "none",
              boxShadow: "none",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="mb-5">
          <textarea
            className="form-control border-0"
            rows="12"
            placeholder="Dear Diary..."
            style={{
              background: "transparent",
              resize: "none",

              fontSize: "18px",
              lineHeight: "1.8",

              outline: "none",
              boxShadow: "none",

              fontFamily: "Georgia, serif",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <hr />

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center mt-4">

          <small className="text-muted fst-italic">
            “Be honest. Be kind to yourself.”
          </small>

          <button
            className="btn btn-dark px-4 py-2"
            onClick={handleSave}
          >
            Save ✨
          </button>

        </div>
      </div>
    </div>
  );
}
