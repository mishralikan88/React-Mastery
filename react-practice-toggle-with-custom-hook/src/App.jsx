// import { useState } from "react";

// const App = () => {
//   const [on, setOn] = useState(false);

//   const handleOn = () => {
//     setOn(!on);
//   };

//   return (
//     <div>
//       <button onClick={handleOn}>{on ? "ON" : "OFF"}</button>
//     </div>
//   );
// };

// export default App;

// custom hook way -

import { useState } from "react";

const useOnOffToggler = (initialState) => {
  const [on, setOn] = useState(initialState);
  const toggler = () => setOn(!on); // toggler is a reference to toggler logic which is !on.
  return [on, toggler];
};

const App = () => {
  const [on, toggler] = useOnOffToggler(false);
  return (
    <div>
      <button onClick={toggler}>{on ? "ON" : "OFF"}</button>
    </div>
  );
};

export default App;


// Implementation Approach -

// 1) Create a custom hook: useOnOffToggler(initial).
// 2) Inside the hook, define state: const [on, setOn] = useState(initial).
// 3) Define toggler: const toggler = () => setOn(prev => !prev).
// 4) Return [on, toggler] from the hook.
// 5) In the component, call: const [on, toggler] = useOnOffToggler(false).
// 6) Render a button with label: on ? "ON" : "OFF".
// 7) Wire onClick to toggler to flip the value.
// 8) (Optional) Pass true to start ON: useOnOffToggler(true).
// 9) Use the functional updater (prev => !prev) to avoid stale state.