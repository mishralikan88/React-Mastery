import React, { useState } from "react";

const App = () => {
  const [copied, setCopied] = useState(false); // stores copy state
  const [text, setText] = useState(""); // stores input state

  const handleInput = (event) => {
    setText(event?.target?.value);
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setText("");
    } catch (error) {
      console.log("Caopy Failed", error);
    }
  };

  return (
    <div>
      <input
        placeholder="Type Something"
        value={text}
        onChange={handleInput}
        type="text"
      />
      <button onClick={handleCopy}>copy</button>
      {copied && <div>Copied!</div>}
    </div>
  );
};

export default App;


// navigator.clipboard.writeText(text); => ncw(inputState)

// Implementation Approach

// 1. Prepare the UI: Create a text input box with a copy button next to it.
// 2. When the user types something in the input and clicks the copy button, 
//   display a confirmation message right below the input/button container.
// 3. On button click, trigger the copy-to-clipboard logic (using input state)
//   and manage the related states accordingly.
