import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./Components/CurrencyRow";
// import axios from "axios";
// import Rate from "./Components/Rate";

function App() {
  const [currencyObject, setCurrencyObject] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [isFromAmount, setisFromAmount] = useState(true);
  // const [fromIndex, setFromIndex] = useState();
  // const [toIndex, setToIndex] = useState();

  const URL = "https://api.exchangerate.host/latest";
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyObject([...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        // setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  let fromAmount, toAmount;
  if (isFromAmount === true) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const HandleFromAmount = () => {
    setisFromAmount(true);
  };

  const HandleToAmount = () => {
    setisFromAmount(false);
  };

  useEffect(() => {
    fetch(`${URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRate(...Object.values(data.rates)));
  }, [fromCurrency, toCurrency]);

  return (
    <div className="App">
      <h1> Currency Converter </h1>
      <CurrencyRow
        currencyObject={currencyObject}
        selectedCurrency={fromCurrency}
        HandleCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        setisFromAmount={setisFromAmount}
        setAmount={setAmount}
        HandleAmount={HandleFromAmount}
      />
      <h4>=</h4>
      <CurrencyRow
        currencyObject={currencyObject}
        selectedCurrency={toCurrency}
        HandleCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        setisFromAmount={setisFromAmount}
        setAmount={setAmount}
        HandleAmount={HandleToAmount}
      />
    </div>
  );
}

export default App;
