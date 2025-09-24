// Goal: Show production patterns.

// Custom hook for persistence - usePersistentState

// Unit tests for reducer logic.

// Context for global counter.

// API sync (e.g., saving count to server).

import React, { useEffect, useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  // called once i.e. after initial page load

  useEffect(() => {
    const saved = localStorage.getItem("count");
    if (saved !== null) {
      setCounter(Number(saved)); // '1' -> 1
    }
  }, []);

  // Everytime count is changed store the  updated counter in local storage

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(counter));
  }, [counter]);

  return (
    <div>
      <h1>Counter</h1>
      <p>{counter}</p>
      <button onClick={() => setCounter((c) => c + 1)}>+1</button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
};

export default App;
