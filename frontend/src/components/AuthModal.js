import React, { useState } from "react";
import supabase from "../supabaseClient";

export default function AuthModal({ onClose, defaultMode }) {

  const [mode, setMode] = useState(defaultMode || "login"); // login | signup

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================
  // SIGN UP
  // =========================
const handleSignup = async () => {

  try {

    if (!username || !email || !password) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    console.log("👉 Starting signup...");


    // 1. Signup
    const { error: signUpError } =
      await supabase.auth.signUp({
        email,
        password,
      });

    console.log("👉 Signup error:", signUpError);

    if (signUpError) {
      alert(signUpError.message);
      setLoading(false);
      return;
    }


    // 2. Get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("👉 User:", user);
    console.log("👉 User error:", userError);


    if (!user) {
      alert("User not found after signup");
      setLoading(false);
      return;
    }


    // 3. Insert profile
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        id: user.id,
        username,
        email,
      });

    console.log("👉 Insert error:", insertError);


    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }


    console.log("✅ Signup success");
    alert("Welcome to SoulNotes 💙");


  } catch (err) {

    console.error("🔥 Signup crash:", err);
    alert("Unexpected error");

  } finally {
    setLoading(false);
  }
};



  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {

    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Invalid credentials 😔");
      setLoading(false);
      return;
    }

    setLoading(false);
  };


  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "380px",
          background: "#F5FAFA",
          fontFamily: "Georgia, serif",
        }}
      >

        {/* Header */}
        <h4 className="fw-bold text-center mb-3">
          {mode === "login" ? "Welcome Back 💙" : "Join SoulNotes ✨"}
        </h4>


        {/* Name (Signup Only) */}
        {mode === "signup" && (
          <input
            className="form-control mb-3"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        )}


        {/* Email */}
        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        {/* Password */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        {/* Main Button */}
        <button
          className="btn btn-primary w-100 mb-2"
          disabled={loading}
          onClick={mode === "login" ? handleLogin : handleSignup}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>


        {/* Switch Mode */}
        <div className="text-center mb-2">
          {mode === "login" ? (
            <small>
              New here?{" "}
              <span
                style={{ cursor: "pointer", color: "#3B9C9C" }}
                onClick={() => setMode("signup")}
              >
                Create account
              </span>
            </small>
          ) : (
            <small>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "#3B9C9C" }}
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </small>
          )}
        </div>


        {/* Cancel */}
        <button
          className="btn btn-light w-100"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
