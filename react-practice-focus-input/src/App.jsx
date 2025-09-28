import { useRef } from "react";

const App = () => {
  const inputRef = useRef(null);
  console.log("input Ref", inputRef);

  // You're creating a ref object that starts as null.

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      {/* HTML Input , not React-Input */}

      <input
        // Now React links the actual <input> DOM element to inputRef.current

        ref={inputRef}
        placeholder="Type here"
        style={{ padding: "8px", fontSize: "16px" }}
        type="text"
      />
      <button
        style={{ marginLeft: "10px", padding: "8px 12px", fontSize: "16px" }}
        onClick={handleFocus}
      >
        Focus
      </button>
    </div>
  );
};

export default App;

// ☑️ 1. Why useRef is used here ?

// In React, every time you want to 'do something' with an actual DOM element (like an <input>, <div>, <button>), you can't just directly grab it like in vanilla JS (document.getElementById), because React keeps control of the DOM.
// useRef gives you a direct reference (a shortcut) to that DOM node.

// ☑️ 2. How does ref work in our case ?

// 1. When you create the ref:
// const inputRef = useRef(null);
// At this moment, inputRef is an object:
// { current: null }

// 2. When you bind it to an element:
// <input ref={inputRef} />
// React automatically updates the current property to point to the real DOM node of that <input>.
// So now inputRef looks like this: { current: HTMLInputElement }

// 3. If you log it:
// console.log(inputRef);
// 👉 You’ll see an object with a current property that holds the actual <input> element.
// 🔑 Key idea:
// Before render → inputRef.current === null
// After render (when DOM is ready) → inputRef.current points to the input element

// when we define a ref variable like const inputRef = useRef(null); the variable will store an object with property current: null.
// When you bind that variable with an HTML input and log it, you’ll see the actual input element inside current.

// ☑️ 3. Why React does not re-render ?

// useRef is just a mutable container object ({ current: ... }).
// When React updates current, it’s doing a direct mutation of that object.
// Mutating .current does not trigger a re-render because React does not “watch” ref changes.

// ☑️ 4. Why useRef instead of document.getElementById or useState ?

// No re-renders → Updating ref.current does NOT trigger a re-render.
// (useState always re-renders, which is wasteful if you only need DOM access)