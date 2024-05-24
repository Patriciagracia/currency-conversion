import React, { useState, useEffect } from "react";
import "../styles/CurrencyConverter.css";

import CurrencySelector from "./CurrencySelector";
import SwapButton from "./SwapButton";
import axios from "axios";

export default function CurrencyConverter() {
  const [rate, setRate] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState({
    value: "GBP",
    label: "GBP - British Pound",
  });
  const [targetCurrency, setTargetCurrency] = useState({
    value: "EUR",
    label: "EUR - Euro",
  });
  const [sourceAmount, setSourceAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  useEffect(() => {
    conversion();
  }, [rate, sourceCurrency, targetCurrency]);

  function fetchCurrencyData() {
    const apiUrl = "https://api.frankfurter.app/latest";
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setRate(data.rates);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }

  function conversion() {
    const sourceRate = rate[sourceCurrency.value] || 1;
    const targetRate = rate[targetCurrency.value] || 1;

    if (isNaN(sourceAmount) || sourceAmount === "" || sourceAmount === ".") {
      setTargetAmount(0);
      return;
    }

    let convertedAmount = ((sourceAmount / sourceRate) * targetRate).toFixed(2);
    setTargetAmount(convertedAmount);
  }

  const handleCurrencyChange = (currency, isSourceCurrency) => {
    if (isSourceCurrency) {
      setSourceCurrency(currency);
    } else {
      setTargetCurrency(currency);
    }
  };

  function handleSourceAmountChange(e) {
    let amount = e.target.value;

    // Allow the dot character without converting
    if (amount === "" || amount === ".") {
      setSourceAmount(amount);
      return;
    }

    if (amount.length <= 9 && !isNaN(amount)) {
      setSourceAmount(amount);
    }

    let sourceRate =
      sourceCurrency.value === "EUR" ? 1 : rate[sourceCurrency.value];
    let targetRate =
      targetCurrency.value === "EUR" ? 1 : rate[targetCurrency.value];

    const newAmount = ((amount / sourceRate) * targetRate).toFixed(2);
    setTargetAmount(newAmount);
  }

  function handleTargetAmountChange(e) {
    const amount = e.target.value;

    if (amount.length <= 9) {
      setTargetAmount(amount);
    }

    let sourceRate;
    if (sourceCurrency.value === "EUR") {
      sourceRate = 1;
    } else {
      sourceRate = rate[sourceCurrency.value];
    }

    let targetRate;
    if (targetCurrency.value === "EUR") {
      targetRate = 1;
    } else {
      targetRate = rate[targetCurrency.value];
    }

    const newAmount = ((amount / targetRate) * sourceRate).toFixed(2);

    setSourceAmount(newAmount);
  }

  function swapCurrencies() {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  }

  return (
    <div className="currencyConversionForm">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <input
                value={sourceAmount}
                onChange={handleSourceAmountChange}
                type="number"
              />
              <div className="col selector">
                <CurrencySelector
                  onCurrencyChange={(currency) =>
                    handleCurrencyChange(currency, true)
                  }
                  currency={sourceCurrency}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row button">
          <SwapButton
            onSwap={swapCurrencies}
            sourceCurrency={sourceCurrency}
            targetCurrency={targetCurrency}
          />
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="input-group mb-3">
              <input
                value={targetAmount}
                onChange={handleTargetAmountChange}
                type="number"
              />
              <div className="col selector">
                <CurrencySelector
                  onCurrencyChange={(currency) =>
                    handleCurrencyChange(currency, false)
                  }
                  currency={targetCurrency}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 text-center">
          <p>
            <span id="sourceText">
              {`${sourceAmount} ${sourceCurrency.value} `}
            </span>
            is equal to
            <span id="targetText">
              {` ${targetAmount} ${targetCurrency.value} `}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
