import React from "react";
import { useState } from "react";

const App = () => {
  const [inputvalue, setInputvalue] = useState("");
  const [chips, Setchips] = useState([]);
  const [chipId, setChipId] = useState(0);

  const handleKeyPress = (event) => {

    // When the user presses Enter, if the input (after trim) is non-empty, create a new chip

    if (event.key === "Enter" && inputvalue.trim() !== "") {
      const newchip = { id: chipId, label: inputvalue.trim() }; 
      Setchips((prev) => [...prev, newchip]); // append , update the total chips -> old chips + newchip
      setChipId((chip) => chip + 1);          // chip ID for the next chip
      setInputvalue("");                      // clear input
    
    }
  };

  const handleDeleteChip = (IdToDelete) => {
    const filteredChipsAfterDeletion = chips.filter((chip) => chip.id !== IdToDelete);
    Setchips(filteredChipsAfterDeletion);
  };

  return (
    <div>
      <h2>chips input </h2>
      <input
        placeholder="Type a chip and press tag"
        onKeyDown={handleKeyPress}
        value={inputvalue}
        onChange={(e) => setInputvalue(e.target.value)}
        type="text"
      />
      <div>
        {chips?.map((chip, chipIdx) => {
          return (
            <div key={chip.id} >
              <span>{chip.label}</span>
              <button
                onClick={() => {
                  handleDeleteChip(chip.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

// Implementation approach - 
// 1. Make the UI ready.
// 2. Prepare the handlers.
// 3. When you type a chip label and press Enter, create a new chip.
//    Add this chip to the array of existing chips and display the total list of chips below.
//    Each chip should have a cross (×) button next to it.
// 4. When you click on the cross button, trigger the delete handler.
//    This will update the chips array, and the updated set of chips will be displayed in the UI.
