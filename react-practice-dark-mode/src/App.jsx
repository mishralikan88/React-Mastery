import React, { useState } from "react";

export default function App() {
  const [dark, setDark] = useState(false);

  const page = {
    height:"95vh",
    background: dark ? "black" : "white",
    color: dark ? "white" : "black",
    fontFamily: "sans-serif",
    textAlign: "center",
    display: "flex",                // ✅ enable flexbox
    justifyContent: "center",       // ✅ horizontal center
    alignItems: "center",           // ✅ vertical center
    flexDirection: "column",        // ✅ stack items top→bottom
  };

  return (
    <div style={page}>
      <h1>{dark? "Dark Mode" : "Light Mode"}</h1>
      <button onClick={()=>setDark(!dark)}>{dark ? "☀️ Light Mode" : "🌙 Dark Mode"}</button>
    </div>
  );
}


/*
Implementation Approach

UI:
- Display text based on the current theme (Light/Dark).
- Show a button whose label also changes with the theme.
- Use minimal CSS to center content and keep the layout clean.

Business Logic:
- On button click, toggle the theme state.
- Update the parent container styles accordingly.
- Update the displayed text and button label to match the new theme.
*/

