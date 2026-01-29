import React from "react";
import CurrentEntry from "./CurrentEntry";
import EntryViewer from "./EntrViewer";
export default function DiaryEditor({ mood, setMood, theme, setRefreshKey, selectedEntry, setSelectedEntry, user }) {
  return (
    <div className="h-100 d-flex flex-column align-items-center">
     

      <div className="w-100" style={{ maxWidth: "720px" }}>
       {selectedEntry ? (

  <EntryViewer
    entry={selectedEntry}
    theme={theme}
    onClose={() => setSelectedEntry(null)}
    setRefreshKey={setRefreshKey}
    user={user}
  />

) : (

  <CurrentEntry
    mood={mood}
    setMood={setMood}
    theme={theme}
    setRefreshKey={setRefreshKey}
    user={user}
  />

)}

      </div>
    </div>
  );
}
