// Goal: Add constraints, extra actions, and persistence.

// Disable decrement below 0.

// Add ±5 buttons.


import React, { useEffect, useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);



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
      <button onClick={handleDecrement} disabled={counter <= 0}>-1</button> 
      <button onClick={handleIncrement} >+1</button>
      <button onClick={()=>setCounter(counter-5)} disabled={counter <= 5} >-5</button> 
      <button onClick={()=>setCounter(counter+5)}  >+5</button>
    </div>
  );
};

export default App;
