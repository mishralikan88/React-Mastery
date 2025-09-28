import { useState } from "react";

const App = () => {
  const [secret, setSecret] = useState(
    () => Math.floor(Math.random() * 100) + 1
  );
  const [msg, setMsg] = useState("");
  const [guess, setGuess] = useState("");

  const check = () => {
    if (isNaN(guess)) return setMsg("Entyer Number Between 1 to 100");
    const number = Number(guess);
    setMsg(
      number === secret
        ? "correct!"
        : number < secret
        ? "Too low!"
        : "Too high!"
    );
  };

  const reset = () => {
    setSecret(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMsg("");
  };

  // minimal message color hint
  const msgColor = msg.toLowerCase().includes("correct")
    ? "#1a7f37"
    : "#374151";

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        maxWidth: 360,
        margin: "40px auto",
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        boxShadow: "0 6px 16px rgba(0,0,0,.06)",
      }}
    >
      <h2 style={{ margin: "0 0 12px", textAlign: "center" }}>
        Guess the Number
      </h2>

      <input
        style={{
          width: "90%",
          padding: "10px 12px",
          border: "1px solid #cfd3d7",
          borderRadius: 8,
          outline: "none",
          fontSize: 16,
        }}
        placeholder="Enter Number between 1 and 100"
        min="1"
        max="100"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        type="number"
      />

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          onClick={check}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #111827",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Check guess
        </button>
        <button
          onClick={reset}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: "#f3f4f6",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Reset game
        </button>
      </div>

      <p
        style={{
          marginTop: 12,
          color: msg ? msgColor : "#374151",
          fontWeight: 600,
        }}
      >
        {msg}
      </p>
    </div>
  );
};

export default App;

// Implementation Approach
//
// 1. Input: Use a controlled <input type="number"> for the guess (1–100).
// 2. State: Store a random secret number, the current guess, and a message for feedback.
// 3. Check button: On click, validate the input and compare it against the secret.
//    - Too low → show "Too low!"
//    - Too high → show "Too high!"
//    - Equal → show "Correct!"
// 4. Reset button: Regenerate a new random number, clear the guess field, and clear the message.
// 5. Feedback: Update the message state to reflect validation errors or guess results.
