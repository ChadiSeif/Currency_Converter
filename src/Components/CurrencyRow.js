import React from "react";

const CurrencyRow = ({
  currencyObject,
  selectedCurrency,
  HandleCurrency,
  amount,
  HandleAmount,
  setAmount,
}) => {
  return (
    <div>
      <input
        type="number"
        value={amount}
        placeholder=""
        onChange={(e) => {
          HandleAmount();
          setAmount(e.target.value);
        }}
      />
      <select onChange={HandleCurrency}>
        <option value="">{selectedCurrency}</option>
        {currencyObject.map((element, i) => (
          <option type={element} key={i} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
