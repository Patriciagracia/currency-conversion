import React, { useState, useEffect } from "react";
import "./styles/CurrencyConverter.css";
import CurrencySelector from "./CurrencySelector";
import Button from "./Button";
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
  }, [rate, sourceCurrency, targetCurrency, sourceAmount]);

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

    const convertedAmount = ((sourceAmount / sourceRate) * targetRate).toFixed(
      2
    );
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
    const amount = parseFloat(e.target.value); // Ensure it's a number
    const limitedDecimals = parseFloat(amount.toFixed(2)); // Limit to 2 decimals and convert back to number
    setSourceAmount(limitedDecimals);

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

    const newAmount = ((amount / sourceRate) * targetRate).toFixed(2);

    setTargetAmount(newAmount);
  }

  function handleTargetAmountChange(e) {
    const amount = parseFloat(e.target.value);
    const limitedDecimals = parseFloat(amount.toFixed(2));
    setTargetAmount(limitedDecimals);

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
        <div className="row sourceData mb-3">
          <span className="col-md-6">
            <input
              value={sourceAmount}
              onChange={handleSourceAmountChange}
              type="number"
            />
          </span>
          <span className="col-md-6">
            <CurrencySelector
              className="selector"
              onCurrencyChange={(currency) =>
                handleCurrencyChange(currency, true)
              }
              currency={sourceCurrency}
            />
          </span>
        </div>
        <div className="row swapBtn">
          {
            <Button
              onSwap={swapCurrencies}
              sourceCurrency={sourceCurrency}
              targetCurrency={targetCurrency}
            />
          }
        </div>
        <div className="row targetData mt-3">
          <span className="col-md-6">
            <input
              value={targetAmount}
              onChange={handleTargetAmountChange}
              type="number"
            />
          </span>
          <span className="col-md-6">
            <CurrencySelector
              className="selector"
              onCurrencyChange={(currency) =>
                handleCurrencyChange(currency, false)
              }
              currency={targetCurrency}
            />
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {`${sourceAmount} ${sourceCurrency.value} is equal to ${targetAmount} ${targetCurrency.value}`}
          </p>
        </div>
      </div>
    </div>
  );
}
