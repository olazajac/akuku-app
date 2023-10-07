import React, { useState, useRef } from "react";

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Funkcja ustawiająca fokus na inpucie
  const focusInput = () => {
    inputRef.current.focus();
    setIsFocused(true);
  };

  // Funkcja wyłączająca fokus z inpucia
  const blurInput = () => {
    inputRef.current.blur();
    setIsFocused(false);
  };

  return (
    <div>
      <h1>Focus/Blur Input</h1>
      <input
        type="text"
        ref={inputRef}
        placeholder="Wpisz coś..."
        autoFocus={isFocused}
      />
      <button onClick={focusInput}>Ustaw Fokus</button>
      <button onClick={blurInput}>Wyłącz Fokus</button>
    </div>
  );
}

export default App;
