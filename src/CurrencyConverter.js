import React, { useState, useEffect } from "react";
import "./styles/CurrencyConverter.css";
import CurrencySelector from "./CurrencySelector";
import Button from "./Button";
import axios from "axios";

export default function CurrencyConverter() {
  const [rate, setRate] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState("GBP");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [sourceAmount, setSourceAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);
  const [valorSelect1, setValorSelect1] = useState("");
  const [valorSelect2, setValorSelect2] = useState("");

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
        console.error("Error fetching data", error);
      });
  }

  // Esta función se encarga de realizar la conversión de divisas por defecto cuando se carga la página por primera vez
  function defaultConversion() {
    const sourceRate = rate[sourceCurrency] || 1;
    const targetRate = rate[targetCurrency] || 1;

    const convertedAmount = ((sourceAmount / sourceRate) * targetRate).toFixed(
      2
    );
    setTargetAmount(convertedAmount);
  }

  // Esta función se encarga de realizar el cambio de la divisa de origen
  const handleCurrencyChange = (currency) => {
    console.log("pasa por handleCurrencyChange");
    console.log(currency);
    setSourceCurrency(currency);
  };
  // Esta función se encarga de realizar el cambio de la divisa objetivo
  const handleTargetCurrency = (currency) => {
    console.log("pasa por handleTargetCurrency");
    console.log(currency);
    setTargetCurrency(currency);
  };

  // Esta función se encarga de realizar el cambio de la divisa de origen, teniendo en cuenta la base de EUR = 1
  function handleSourceAmountChange(e) {
    const amount = e.target.value;
    setSourceAmount(amount);

    let sourceRate;

    if (sourceCurrency === "EUR") {
      sourceRate = 1;
    } else {
      sourceRate = rate[sourceCurrency];
    }

    let targetRate;

    if (targetCurrency === "EUR") {
      targetRate = 1;
    } else {
      targetRate = rate[targetCurrency];
    }

    const newAmount = ((amount / sourceRate) * targetRate).toFixed(2);

    setTargetAmount(newAmount);
  }

  // Esta función se encarga de realizar el cambio de la divisa de destino, teniendo en cuenta la base de EUR = 1

  function handleTargetAmountChange(e) {
    const amount = e.target.value;
    setTargetAmount(amount);

    let sourceRate;
    if (sourceCurrency === "EUR") {
      sourceRate = 1;
    } else {
      sourceRate = rate[sourceCurrency];
    }

    let targetRate;
    if (targetCurrency === "EUR") {
      targetRate = 1;
    } else {
      targetRate = rate[targetCurrency];
    }

    const newAmount = ((amount / targetRate) * sourceRate).toFixed(2);

    setSourceAmount(newAmount);
  }

  // Esta función se encarga de realizar el intercambio de divisas cuando se hace click en el botón
  function intercambioDivisas() {
    console.log("pasa por intercambio Divisas");
    console.log(targetCurrency);
    console.log(sourceCurrency);

    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  }

  // Aquí estoy definiendo las opciones de los selectores (creo que el conversor utiliza bien lo valores y que el fallo está en el label)
  const currentSourceOption = {
    value: sourceCurrency,
    label: sourceCurrency,
  };
  const currentTargetOption = {
    value: targetCurrency,
    label: targetCurrency,
  };

  // He creado esta función para intentar cambiar el texto de los selectores, usando los objetos que hay justo arriba
  function cambioValoresSelect() {
    console.log("cambio de valores select");
    console.log(currentSourceOption);
    console.log(currentTargetOption);
    setValorSelect1(currentSourceOption);
    setValorSelect2(currentTargetOption);
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
          <div className="col-6 selector" id="from">
            <CurrencySelector
              onChange={handleCurrencyChange}
              value={currentSourceOption}
              //rate={rate}
              //label={sourceCurrency} // he agregado label, es un prop que se pasa desde CurrencySelector (aunque no funciona)
            />
          </div>
        </div>
        <div className="row swapBtn">
          <button
            onClick={() => {
              intercambioDivisas();
              cambioValoresSelect();
            }}
          >
            {" "}
            😭
          </button>
          {/* <Button
  onSwap={handleSwap}
  sourceCurrency={sourceCurrency}
  targetCurrency={targetCurrency}
  handleCurrencyChange={handleCurrencyChange}
  handleTargetCurrency={handleTargetCurrency}
/> */}
        </div>
        <div className="row targetData mt-3">
          <div className="col-6">
            <input
              value={targetAmount}
              onChange={handleTargetAmountChange}
              type="number"
            />
          </div>
          <div className="col-6 selector" id="to">
            <CurrencySelector
              onChange={handleTargetCurrency}
              value={currentTargetOption}
              //rate={rate}
              //label={targetCurrency} //he agregado label, es un prop que se pasa desde CurrencySelector (aunque no funciona)
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
