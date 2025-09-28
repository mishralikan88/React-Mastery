import { useState } from "react";

const Accordion = ({ items }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const handleHeaderClick = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "16px", fontFamily: "Arial, sans-serif" }}>
          Frequently Asked Questions
        </h2>

        {items.map((item, accordionIdx) => {
          const isOpen = openIdx === accordionIdx;
          return (
            <div
              key={item.title}
              style={{
                width: "500px",
                border: "1px solid #ccc",
                marginBottom: "8px",
              }}
            >
              {/* Accordion Header */}

              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  textAlign: "left",
                  background: "#f5f5f5",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => handleHeaderClick(accordionIdx)}
              >
                <span>{item.title}</span>
                <span>{isOpen ? "▼" : "▶"}</span>
              </button>

              {/* Accordion Content */}
              {openIdx === accordionIdx && (
                <div style={{ padding: "8px", background: "#fff" }}>
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App = () => {
  const items = [
    {
      title: "Javascript Basics",
      content: "Learn variables , functions & loop in javascript.",
    },
    {
      title: "React.js Overview",
      content: "Understand component, state, & props in React.",
    },
    {
      title: "Node.js",
      content: "Basics of server side development with Node.js",
    },
    {
      title: "Full-Stack Development",
      content: "Build Full-Stack apps with React and Node.js",
    },
  ];
  return (
    <div>
      <Accordion items={items} />
    </div>
  );
};

export default App;

// Accordion Logic Explanation - 
//
// 1. Maintain a state variable `openIdx` to track the currently open accordion.
//    - Initialized to null → all accordions are collapsed.
//
// 2. Each accordion header passes its index to `handleHeaderClick`.
//    - We use an arrow function: () => handleHeaderClick(accordionIdx)
//      because we need to pass a parameter (not just a reference).
//
// 3. Inside `handleHeaderClick`, update `openIdx`:
//    - If the clicked index is already open → set back to null (collapse it).
//    - Otherwise → set to the clicked index (expand it).
//
// 4. During rendering, conditionally display content only when
//    openIdx === accordionIdx. This ensures only one accordion is open at a time.
//
// 👉 In summary: openIdx acts as the "active index". It controls visibility of
//    accordion content, enforces single-open behavior, and enables toggle logic.

// For each item, we compute a boolean `isOpen = openIdx === accordionIdx`.
// This flag tells us whether the current accordion is expanded or collapsed.
// We use it to:
// 1) Toggle the chevron (▶ when closed, ▼ when open)
// 2) Conditionally render the content panel only when open