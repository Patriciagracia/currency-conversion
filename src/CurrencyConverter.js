import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import axios from "axios";

export default function CurrencyConverter() {
  const [rate, setRate] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  function fetchCurrencyData() {
    const apiUrl = "https://api.frankfurter.app/latest";
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        setRate(data.rates);
      })
      .catch((error) => {
        console.error("Error fetching data");
      });
  }

  const handleCurrencyChange = (currency) => {
    setSourceCurrency(currency);
  };

  const handleTargetCurrency = (currency) => {
    setTargetCurrency(currency);
  };

  function handleSourceAmountChange(e) {
    const amount = e.target.value;
    setSourceAmount(amount);

    const sourceRate = rate[sourceCurrency];
    const targetRate = rate[targetCurrency];
    const newAmount = (amount / sourceRate) * targetRate;

    setTargetAmount(newAmount);
  }

  return (
    <div className="CurrencyConversionForm">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <input
              value={sourceAmount}
              onChange={handleSourceAmountChange}
              type="number"
            />
          </div>
          <div className="col-6">
            <CurrencySelector
              selectedCurrency={sourceCurrency}
              onChange={handleCurrencyChange}
              rate={rate}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input type="number" value={targetAmount} readOnly />
          </div>
          <div className="col-6">
            <CurrencySelector
              selectedCurrency={targetCurrency}
              rate={rate}
              onChange={handleTargetCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
