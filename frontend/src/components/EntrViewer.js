import React from "react";
import axios from "axios";

export default function EntryViewer({
  entry,
  theme,
  onClose,
  setRefreshKey,
  user,
}) {

  // ========================
  // DELETE ENTRY
  // ========================
  const handleDelete = async () => {

    if (!user?.id) {
      alert("Please login again.");
      return;
    }

    if (!entry?.id) {
      alert("Invalid entry.");
      return;
    }

    if (!window.confirm("Delete this entry forever?")) return;


    try {

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/entries/${entry.id}`,
        {
          params: { userId: user.id }
        }
      );

      alert("Deleted 🗑️");

      setRefreshKey((prev) => prev + 1);
      onClose();


    } catch (err) {

      console.error("Delete Error:", err);

      alert("Delete failed 😔");
    }
  };


  // ========================
  // SAFETY
  // ========================
  if (!entry) {
    return (
      <p className="text-center text-muted mt-5">
        No entry selected
      </p>
    );
  }


  return (
    <div className="container py-4">

      <div
        className="mx-auto shadow-lg p-5"
        style={{
          maxWidth: "900px",
          background: "#fffdf7",
          borderRadius: "12px",
          fontFamily: "Georgia, serif",
        }}
      >

        {/* Header */}
        <div className="d-flex justify-content-between mb-3">

          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onClose}
          >
            ← Back
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>


        <h3>
          {entry.title || "Untitled"}
        </h3>


        <p className="text-muted">
          {entry.entry_date} · {entry.mood}
        </p>


        <hr />


        <p
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            fontSize: "17px",
          }}
        >
          {entry.content}
        </p>

      </div>
    </div>
  );
}
