import React, { useState, useEffect } from "react";
import axios from "axios";
import supabase from "../supabaseClient";

export default function Sidebar({ refreshKey, setSelectedEntry, user }) {

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState([]);


  // ========================
  // FETCH ENTRIES
  // ========================
  useEffect(() => {

    if (!user?.id) return;

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/list`, {
        params: { userId: user.id }
      })
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));

  }, [refreshKey, user?.id]);


  // ========================
  // LOGOUT
  // ========================
  const handleLogout = async () => {

    const confirm = window.confirm(
      "Do you want to logout from SoulNotes?"
    );

    if (!confirm) return;

    await supabase.auth.signOut();

    // Reset app to landing
    window.location.reload();
  };


  // ========================
  // FILTER ENTRIES
  // ========================
  const filteredEntries = entries.filter((e) =>
    (e.title || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (e.content || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div className="p-3 h-100 d-flex flex-column">

      {/* ================= App Name ================= */}
      <h5
        className="fw-bold text-primary text-center mb-3"
      >
        SoulNotes
      </h5>


      {/* ================= Search ================= */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* ================= Date Filter (Future) ================= */}
      <input
        type="date"
        className="form-control mb-3"
        disabled
      />


      <hr />


      {/* ================= Entries ================= */}
      <div className="flex-grow-1 overflow-auto">

        <p className="text-muted small text-center">
          Last Entries
        </p>

        {filteredEntries.length === 0 && (
          <p className="text-center small text-muted">
            No entries found
          </p>
        )}


        {filteredEntries.map((e) => (

          <div
            key={e.id}
            className="p-2 mb-2 rounded small bg-light"
            style={{ cursor: "pointer" }}

            onClick={() => setSelectedEntry(e)}
          >

            <div className="fw-semibold">
              {e.title || "Untitled"}
            </div>

            <div className="text-muted">
              {e.entry_date}
            </div>

          </div>

        ))}

      </div>


      {/* ================= Logout ================= */}
      <div className="pt-3 border-top">

        <button
          className="btn btn-outline-danger w-100"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}
