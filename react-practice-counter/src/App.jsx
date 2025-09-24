import React from "react";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {

   // Batching -> React combines multiple state updates into one, so the component re-renders only once instead of after every update.

   // Even if setState is called many times in one handler, React processes them sequentially and renders once with the final state.

   // The functional updater (setCount(c => c + 1)) ensures each update uses the latest state during batching.

   // When the initial counter is 0, clicking the +1 button updates the state from 0 to 4 in a single re-render.

    setCount(count => count + 1);
    setCount(count => count + 1);
    setCount(count => count + 1);
    setCount(count => count + 1);
  };

  const handleDecrement = () => {

    // React does batch these updates (so only one render). But since we're using the non-functional form (setCount(count - 1)), both calls read `count` from the closure (stale snapshot). As a result, both updates calculate "count - 1" from the same old value, instead of applying sequentially. Final result: only -1 instead of -2.

    setCount(count - 1);
    setCount(count - 1);
  };
  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={handleDecrement}>-1</button>
      <button onClick={handleIncrement}>+1</button>
    </div>
  );
};

export default App;
