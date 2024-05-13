import React, { useState, useEffect } from "react";

import "./styles/Button.css";
import buttonIcon from "./styles/buttonIcon.png";

export default function Button({ onSwap }) {
  const [sourceCurrencySwap, setSourceCurrencySwap] = useState();
  const [targetCurrencySwap, setTargetCurrencySwap] = useState();

  function swap(e) {
    let a = sourceCurrencySwap;
    let b = targetCurrencySwap;
    setSourceCurrencySwap(b);
    setTargetCurrencySwap(a);
    onSwap();
  }

  return (
    <button className="swapBtn" onClick={swap}>
      <img src={buttonIcon} alt="submit" />
    </button>
  );
}
