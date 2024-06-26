import React, { useState } from "react";
import "../styles/Button.css";
import exchangeIcon from "../styles/exchangeIcon.png";

export default function SwapButton({ onSwap }) {
  const [sourceCurrencySwap, setSourceCurrencySwap] = useState();
  const [targetCurrencySwap, setTargetCurrencySwap] = useState();

  function swap() {
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
      <img src={exchangeIcon} alt="submit" />
    </button>
  );
}
