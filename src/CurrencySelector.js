import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export default function CurrencySelector({ onChange, value }) {
  console.log(value);

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(value);

  //console.log("selectedCurrency");
  //console.log(selectedCurrency);
  //onChange(selectedCurrency.value);

  const onChangeCurrency = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    onChange(selectedOption.value);
    /*return {
      value: selectedOption.value,
      label: selectedOption.label,
    };*/
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
    setSelectedCurrency(value);
  }, [value]);

  return (
    <div>
      <Select
        value={selectedCurrency}
        //label={etiqueta} //en mi mente esto proviene de la línea 21 y serviría para arreglar el problema del texto mostrado en el selector
        onChange={onChangeCurrency}
        options={currencyOptions}
      />
    </div>
  );
}
