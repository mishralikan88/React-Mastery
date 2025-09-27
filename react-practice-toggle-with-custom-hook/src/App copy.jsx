import React, { useState } from "react";

// minimal custom hook
function useToggle(initial) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(v => !v);
  return [on, toggle];
}

export default function App() {
  const [on, toggle] = useToggle(false); // starts OFF

  return (
    <button onClick={toggle}>
      {on ? "ON" : "OFF"}
    </button>
  );
}
