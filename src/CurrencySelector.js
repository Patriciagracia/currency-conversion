import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export default function CurrencySelector({ onChange, currency }) {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(currency.value);

  const onChangeCurrency = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    onChange(selectedOption);
  };

  useEffect(() => {
    axios
      .get("https://api.frankfurter.app/currencies")
      .then((response) => {
        const data = response.data;
        const options = Object.entries(data).map(([symbol, name]) => ({
          value: symbol,
          label: `${name} - ${symbol}`,
        }));

        setCurrencyOptions(options);
      })

      .catch((error) => {
        console.error("Error fetching currencies:", error);
      });
  }, []);

  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  return (
    <div>
      <Select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        options={currencyOptions}
      />
    </div>
  );
}
