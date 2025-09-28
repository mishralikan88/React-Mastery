

// const App = () => {
//   const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

//   return (
//     <div>
//       <ul>
//         {items.map((item) => {
//           return <li title={`This is ${item}`}>{item}</li>;
//         })}
//       </ul>
//     </div>
//   );
// };

// export default App;

// Explanation -

// 1. <li title="This is Item 1">Item 1</li>

// 2. The title attribute is all you need.

// 3. Hover your mouse → tooltip appears (no extra CSS, no JavaScript).



// Customised Tooltip - 


const App = () => {
  const items = [
    { label: "Item 1", tip: "How many items do we have?" },
    { label: "Item 2", tip: "Contact: support@example.com" },
    { label: "Item 3", tip: "Some other custom message" },
    { label: "Item 4", tip: "Default info for item 4" },
  ];

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} title={item.tip}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
