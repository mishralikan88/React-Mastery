// Counter app + side effects

import React, { useEffect, useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  // This effect runs after the initial render & again after every re-render when `counter` changes.

  useEffect(() => {
    document.title = `count: ${counter}`;
  }, [counter]);

  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };

  const handleDecrement = () => {
    setCounter((counter) => counter - 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>{counter}</p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
    </div>
  );
};

export default App;
