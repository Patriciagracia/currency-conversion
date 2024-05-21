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

  const [tempSourceAmount, setTempSourceAmount] = useState(1);
  const [tempTargetAmount, setTempTargetAmount] = useState(0);

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

    let convertedAmount = ((sourceAmount / sourceRate) * targetRate).toFixed(2);
    setTargetAmount(convertedAmount);
    setTempTargetAmount(convertedAmount);
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
    if (amount.length <= 9) {
      setTempSourceAmount(amount);
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

    const newAmount = ((amount / sourceRate) * targetRate).toFixed(2);
    setTempTargetAmount(newAmount);
  }

  function handleSourceAmountBlur() {
    setSourceAmount(tempSourceAmount);
  }

  function handleTargetAmountChange(e) {
    const amount = e.target.value;
    if (amount.length <= 9) {
      setTempTargetAmount(amount);
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
    setTempSourceAmount(newAmount);
  }

  function handleTargetAmountBlur() {
    setTargetAmount(tempTargetAmount);
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
                value={tempSourceAmount}
                onChange={handleSourceAmountChange}
                onBlur={handleSourceAmountBlur}
                type="number"
                step="0.01"
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
          <Button
            onSwap={swapCurrencies}
            sourceCurrency={sourceCurrency}
            targetCurrency={targetCurrency}
          />
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="input-group mb-3">
              <input
                value={tempTargetAmount}
                onChange={handleTargetAmountChange}
                onBlur={handleTargetAmountBlur}
                type="number"
                step="0.01"
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
            {`${parseFloat(sourceAmount).toFixed(2)} ${
              sourceCurrency.value
            } is equal to ${parseFloat(targetAmount).toFixed(2)} ${
              targetCurrency.value
            }`}
          </p>
        </div>
      </div>
    </div>
  );
}
