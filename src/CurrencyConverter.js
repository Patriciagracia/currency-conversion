import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import axios from "axios";

export default function CurrencyConverter() {
  const [rate, setRate] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("AUD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [sourceAmount, setSourceAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState("");

  let sourceRate = 1;
  let targetRate = 1;

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

    sourceRate = rate[sourceCurrency];
    //const targetRate = rate[targetCurrency];

    if (targetCurrency === "EUR") {
      console.log("ENTRA EN EURO");
      targetRate = 1;
    } else {
      targetRate = rate[targetCurrency];
      console.log("ENTRA EN ELSE");
    }
    console.log("(" + amount + "/" + sourceRate + ")*" + targetRate);
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
