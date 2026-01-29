import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "./components/Sidebar";
import DiaryEditor from "./components/DiaryEditor";
import AIDost from "./components/AIDost";
import LandingPage from "./components/LandingPage";
import AuthModal from "./components/AuthModal";

import supabase from "./supabaseClient";
import { moodThemes } from "./themes/moods";

function App() {

  // ==========================
  // AUTH MODE (login / signup)
  // ==========================
  const [authMode, setAuthMode] = useState("login");


  // ==========================
  // UI STATES
  // ==========================
  const [showDiary, setShowDiary] = useState(false);
  const [showAuth, setShowAuth] = useState(false);


  // ==========================
  // USER
  // ==========================
  const [user, setUser] = useState(null);


  // ==========================
  // APP STATES
  // ==========================
  const [mood, setMood] = useState("Reflective");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState(null);


  const theme = moodThemes[mood];


  // ==========================
  // AUTH LISTENER
  // ==========================
  // AUTH LISTENER
  // ==========================
  useEffect(() => {

    // Check existing session (but don't show diary)
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user);
      }
    });


    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (session?.user) {

          setUser(session.user);

          // Save profile after signup
          const name = localStorage.getItem("pendingName");

          if (name) {
            await supabase.from("users").upsert({
              id: session.user.id,
              name,
              email: session.user.email,
            });

            localStorage.removeItem("pendingName");
          }

          // Show diary only after actual sign-in event, not on initial session restore
          if (event === "SIGNED_IN") {
            setShowAuth(false);
            setShowDiary(true);
          }
        }


        if (event === "SIGNED_OUT") {
          setUser(null);
          setShowDiary(false);
        }
      }
    );


    return () => {
      subscription.unsubscribe();
    };

  }, []);


  // ==========================
  // LANDING PAGE
  // ==========================
  if (!showDiary) {
    return (
      <>
        <LandingPage
          setShowAuth={setShowAuth}
          setAuthMode={setAuthMode}
        />


        {/* AUTH MODAL */}
        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            defaultMode={authMode}
          />
        )}
      </>
    );
  }


  // ==========================
  // MAIN APP
  // ==========================
  return (
    <>
      {/* AUTH MODAL */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          defaultMode={authMode}
        />
      )}


      <div
        className="d-flex min-vh-100"
        style={{
          width: "100vw",
          overflow: "hidden",
          backgroundColor: theme.bg,
        }}
      >

        {/* ================= Sidebar ================= */}
        <div
          style={{
            width: "10%",
            minWidth: "200px",
            background: theme.card,
            borderRight: "1px solid #ddd",
          }}
        >
          <Sidebar
            mood={mood}
            setMood={setMood}
            refreshKey={refreshKey}
            setSelectedEntry={setSelectedEntry}
            user={user}
          />
        </div>


        {/* ================= Diary ================= */}
        <div
          style={{
            width: "50%",
            padding: "24px",
            background: theme.bg,
            overflowY: "auto",
          }}
        >
          <DiaryEditor
            mood={mood}
            setMood={setMood}
            theme={theme}
            setRefreshKey={setRefreshKey}
            selectedEntry={selectedEntry}
            setSelectedEntry={setSelectedEntry}
            user={user}
          />
        </div>


        {/* ================= AIDost ================= */}
        <div
          style={{
            width: "40%",
            background: theme.card,
            borderLeft: "1px solid #ddd",
            overflowY: "auto",
          }}
        >
          <AIDost
            mood={mood}
            theme={theme}
            user={user}
          />
        </div>

      </div>
    </>
  );
}

export default App;
