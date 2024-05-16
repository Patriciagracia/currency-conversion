//AHORA MISMO INACTIVO!!!!!!!!!!!!!!!!!!!!!

import React, { useState } from "react";

import "./styles/Button.css";
import buttonIcon from "./styles/buttonIcon.png";

export default function Button({ onSwap }) {
  const [sourceCurrencySwap, setSourceCurrencySwap] = useState();
  const [targetCurrencySwap, setTargetCurrencySwap] = useState();
  const [sourceSelectorValue, setSourceSelectorValue] = useState();
  const [targetSelectorValue, setTargetSelectorValue] = useState();

  function swap(e) {
    let a = sourceCurrencySwap;
    let b = targetCurrencySwap;
    setSourceCurrencySwap(b);
    setTargetCurrencySwap(a);
    onSwap(); //<- onSwap es una función que se pasa como prop al componente Button desde CurrencyConverter
  }

  function displayChangeSelector() {
    //otro intento en vano de cambiar el texto mostrado en los selectores
    let c = sourceSelectorValue;
    let d = targetSelectorValue;
    setSourceSelectorValue(d);
    setTargetSelectorValue(c);
  }

  return (
    <button
      className="swapBtn"
      onClick={() => {
        swap();
        displayChangeSelector();
      }}
    >
      <img src={buttonIcon} alt="submit" />
    </button>
  );
}
