import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("red");
  const [isChecked, setIsChecked] = useState(false);
  const newColor = color === "red" ? "blue" : "red";

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
          Change to {newColor}
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
