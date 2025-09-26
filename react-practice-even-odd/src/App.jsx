import React from "react";
import { useState } from "react";

const App = () => {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    setNumber(event.target.value);
  };

  const checkEvenOrOdd = () => {
    setLoading(true);
    setTimeout(() => {
      const parsedNumber = Number(number);
      if (isNaN(parsedNumber)) {
        setResult("please enter a valid number");
      } else
        setResult(
          `The number ${parsedNumber} is ${
            parsedNumber % 2 === 0 ? "even" : "odd"
          }. `
        );
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1>Even or Odd Checker</h1>
      <input
        placeholder="Enter a number"
        data-testid="number-input"
        value={number}
        onChange={handleInput}
        type="text"
      />
      {/* pivot */}
      <button onClick={checkEvenOrOdd}>check</button>
      <div>
        {loading && <div>Checking ...</div>}
        {!loading && result && <div>{result}</div>}
      </div>
    </div>
  );
};

export default App;

// pseudocode -

// 1. Make the basic UI setup — an input box to receive input, a button to check even/odd, and a result area to show the value.
// 2. Start accepting input from the textbox using onChange to capture the number.
// 3. Use that number inside the onClick button handler for the even/odd logic.
// 4. We introduced a setTimeout inside the click handler to simulate a time delay on every number check.
// 5. We also handle the 'not a number' (NaN) validation inside the onClick handler.We have also handled Loading part as Loading... for better UI/UX

// {loading && <div>Checking ...</div>}
// {!loading && result && <div>{result}</div>}
// Code - Explanation -
// 1. If loading is true → show "Checking ..."
// 2. If not loading and result has a value → show result

// resource - https://namastedev.com/practice/even-or-odd
