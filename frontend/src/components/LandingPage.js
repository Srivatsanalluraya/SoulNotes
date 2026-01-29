import React from "react";

export default function LandingPage({ setShowAuth, setAuthMode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E6F4F3", // Reflective bg
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Logo */}
        <h4
          className="fw-bold mb-0"
          style={{ color: "#3B9C9C" }}
        >
          SoulNotes
        </h4>

        {/* Auth Buttons */}
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={()=> {setShowAuth(true); setAuthMode("login");}}>
            Login
          </button>

          <button className="btn btn-primary" onClick={() => {
  setAuthMode("signup");
  setShowAuth(true);
}}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3"
      >
        {/* Title */}
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "3.5rem",
            color: "#2F4F4F",
          }}
        >
          SoulNotes
        </h1>

        {/* Caption */}
        <p
          className="mb-4"
          style={{
            fontSize: "1.25rem",
            maxWidth: "600px",
            color: "#4A6F6F",
          }}
        >
          A quiet space to reflect, heal, and grow —
          one thought at a time.
        </p>

        {/* CTA Button */}
        <button
          className="btn btn-lg px-4 py-2"
          style={{
            background: "#3B9C9C",
            color: "white",
            border: "none",
            borderRadius: "30px",
          }}
          onClick={() => {
  setAuthMode("signup");
  setShowAuth(true);
}}
        >
          Start Writing ✍️
        </button>
      </div>
    </div>
  );
}
