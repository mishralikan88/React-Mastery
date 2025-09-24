// Retrieve state from localStorage and persist updates back to localStorage.

import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved ? JSON.parse(saved) : 0; // JSON.parse(saved) or Number(saved) -> This will return a number
  });
  // counter is a number

  useEffect(() => {
    localStorage.setItem("count", counter);
  }, [counter]);

  return (
    <div>
      <h1>Counter</h1>
      <p>{counter}</p>
       {/* React automatically converts counter into a string when painting the DOM */}
      <button onClick={() => setCounter((c) => c + 1)}>+1</button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
}

export default App;


// Initial render :

// When the app starts, React runs useState(() => …) and checks localStorage.
// Since there's no "count" key yet, it returns 0 because saved is null.
// counter state is set to 0, so the UI shows 0.
// Then the useEffect runs and writes "0" (as a string) into localStorage under the key "count".

// When user clicks +1 :

// setCounter updates the counter value (0 → 1, 1 → 2, and so on).
// After each update, React re-renders and the useEffect runs again.
// This updates localStorage with the latest value (stored as a string: "1", "2", etc.).

// Persistence :

// localStorage is persistent, meaning data is not lost on page reloads or browser restarts.
// So if the app reloads/crashes, React reads the saved value from localStorage during initialization.
// That saved value becomes the initial state for counter, and the UI shows the last stored number immediately.