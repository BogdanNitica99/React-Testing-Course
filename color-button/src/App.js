import { useState } from "react";
import "./App.css";

export function camelCaseToSpaceColorNames(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [color, setColor] = useState("MediumVioletRed");
  const [isChecked, setIsChecked] = useState(false);
  const newColor =
    color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div className="App">
      <div>
        <button
          style={{ backgroundColor: isChecked ? "gray" : color }}
          onClick={() => {
            setColor(newColor);
          }}
          disabled={isChecked}
        >
          Change to {camelCaseToSpaceColorNames(newColor)}
        </button>

        <input
          type="checkbox"
          value={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          id="disable-button"
        />
        <label htmlFor="disable-button">Disable button</label>
      </div>
    </div>
  );
}

export default App;
