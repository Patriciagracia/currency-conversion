import React, { useState } from "react";

import "./styles/Button.css";
import buttonIcon from "./styles/buttonIcon.png";

export default function Button({ onSwap }) {
  const [sourceCurrencySwap, setSourceCurrencySwap] = useState();
  const [targetCurrencySwap, setTargetCurrencySwap] = useState();

  function swap(e) {
    const sourceCurrency = sourceCurrencySwap;
    const targetCurrency = targetCurrencySwap;
    setSourceCurrencySwap(targetCurrency);
    setTargetCurrencySwap(sourceCurrency);
    onSwap();
  }

  return (
    <button
      className="button"
      onClick={() => {
        swap();
      }}
    >
      <img src={buttonIcon} alt="submit" />
    </button>
  );
}
