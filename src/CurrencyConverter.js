import React, { useState, useEffect } from "react";
import "./styles/CurrencyConverter.css";
import CurrencySelector from "./CurrencySelector";
import axios from "axios";

export default function CurrencyConverter() {
  const [rate, setRate] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("GBP");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [sourceAmount, setSourceAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);
  const gbpOption = { value: "GBP", label: "British Pound - GBP" };
  const eurOption = { value: "EUR", label: "Euro - EUR" };
  let sourceRate = 1;
  let targetRate = 1;

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  useEffect(() => {
    defaultConversion();
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
        console.error("Error fetching data");
      });
  }

  function defaultConversion() {
    let sourceRate = rate[sourceCurrency] || 1;
    let targetRate = rate[targetCurrency] || 1;

    const newAmount = ((sourceAmount / sourceRate) * targetRate).toFixed(2);
    setTargetAmount(newAmount);
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

    if (sourceCurrency === "EUR") {
      sourceRate = 1;
    } else {
      sourceRate = rate[sourceCurrency];
    }

    if (targetCurrency === "EUR") {
      targetRate = 1;
    } else {
      targetRate = rate[targetCurrency];
    }
    console.log("(" + amount + "/" + sourceRate + ")*" + targetRate);
    const newAmount = ((amount / sourceRate) * targetRate).toFixed(2);

    setTargetAmount(newAmount);
  }

  return (
    <div className="currencyConversionForm">
      <div className="container">
        <div className="row sourceData mb-3">
          <div className="col-6">
            <input
              value={sourceAmount}
              onChange={handleSourceAmountChange}
              type="number"
            />
          </div>
          <div className="col-6 selector">
            <CurrencySelector
              onChange={handleCurrencyChange}
              defaultValue={gbpOption}
              rate={rate}
            />
          </div>
        </div>
        <div className="row targetData mt-3">
          <div className="col-6">
            <input type="number" value={targetAmount} readOnly />
          </div>
          <div className="col-6 selector">
            <CurrencySelector
              onChange={handleTargetCurrency}
              defaultValue={eurOption}
              rate={rate}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            {`${sourceAmount} ${sourceCurrency} is equal to ${targetAmount} ${targetCurrency}`}
          </p>
        </div>
      </div>
    </div>
  );
}
