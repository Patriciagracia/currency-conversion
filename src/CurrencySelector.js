import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CurrencySelector({ onChange }) {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const onChangeCurrency = (event) => {
    setSelectedCurrency(event.target.value);
    onChange(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://api.frankfurter.app/currencies")
      .then((response) => {
        const data = response.data;
        const options = Object.entries(data).map(([symbol, name]) => ({
          symbol,
          name,
        }));

        setCurrencyOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching currencies:", error);
      });
  }, [onChange]);

  return (
    <div>
      <select onChange={onChangeCurrency} value={selectedCurrency}>
        {currencyOptions.map((currency) => (
          <option key={currency.symbol} value={currency.symbol}>
            {currency.name} - {currency.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}
