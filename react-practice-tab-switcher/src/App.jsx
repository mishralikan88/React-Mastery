
import { useState } from "react";

const App = () => {


  const [active, setActive] = useState(0); // The state variable active is initialized with 0, which means the first tab will be selected by default.

  const tabs = [
    { label: "First", content: "First Tab Content" },
    { label: "Second", content: "Second Tab Content" },
    { label: "Third", content: "Third Tab Content" },
  ];

  return (
    <div>
      <h1>React Tab Switcher</h1>
      <div>
        {tabs.map((tab, tabindex) => {
          return <button onClick={()=>setActive(tabindex)}>{tab.label}</button>;
        })}
      </div>

      <div>
        {tabs[active] && <p>{tabs[active].content}</p>  }
      </div>
    </div>
  );
};

export default App;




/*

Implementation Notes - 

UI -

1) Show a heading "React Tab Switcher".
2) Render a row of buttons from the `tabs` array (each has a label).
3) Below the buttons, render a panel area to display the selected tab’s content.

Logic -

- Start with the first tab active: `active = 0`.
- When a user clicks a tab button, update `active` to that tab’s index.
- The panel shows `tabs[active].content`, which updates automatically after each click.

*/