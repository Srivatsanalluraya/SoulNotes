import React, { useState } from "react";
import axios from "axios";

export default function AIDost() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState("");
  const [error, setError] = useState("");

  const talkToDost = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/aidost/generate"
      );

      setInsight(res.data.insight);

    } catch (err) {
      setError("AIDost is resting 😴");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-100 d-flex flex-column">

      {/* Header */}
      <h4 className="fw-bold text-center mb-3">
        🧠 AIDost
      </h4>

      <p className="text-muted text-center small mb-3">
        Your friendly weekly companion 💙
      </p>

      {/* Insight Area */}
      <div
        className="flex-grow-1 p-3 rounded mb-3"
        style={{
          background: "#f8f9fa",
          overflowY: "auto",
        }}
      >
        {!insight && !loading && (
          <p className="text-muted text-center">
            Click below to get insights
          </p>
        )}

        {loading && (
          <p className="text-primary text-center">
            Thinking...
          </p>
        )}

        {error && (
          <p className="text-danger text-center">
            {error}
          </p>
        )}

        {insight && (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
            }}
          >
            {insight}
          </pre>
        )}
      </div>

      {/* Button */}
      <button
        className="btn btn-primary w-100"
        onClick={talkToDost}
        disabled={loading}
      >
        Talk to AIDost 💙
      </button>

    </div>
  );
}
