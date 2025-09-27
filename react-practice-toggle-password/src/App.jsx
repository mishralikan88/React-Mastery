import React from "react";
import { useState } from "react";

const App = () => {
  const [show, setShow] = useState(false);
  const [pwd, setPwd] = useState("");

  const handlePassword = () => {
    setShow(!show);
  };

  return (
    <div>
      <h3>Toggle Password</h3>
      <div>
        <input
          placeholder="Enter password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          type={show ? "text" : "password"}
        />
        {/* when show is clicked show gets true and the text in button gets changed from show to hide and vice versa */}
        <button onClick={handlePassword}>{show ? "hide" : "show"}</button>
      </div>
      <div>{show ? "password visible" : "password hidden"}</div>
    </div>
  );
};

export default App;



// Implementation approach -
//
// - Set `show` to false initially.
// - When `show` is true, change the input type to "text" and display "Password visible" below the input.
// - When `show` is false (on button click), change the input type to "password" and display "Password hidden" below the input.
// - The button toggles the `show` state, and a `password` state stores the entered password.
