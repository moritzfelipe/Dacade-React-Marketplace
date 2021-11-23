import React from "react";
import { ERC20_DECIMALS } from "../../utils/constants";

const Balance = ({amount, symbol}) => {

  if (amount) {
    return (
      <>
        <span className="nav-link border rounded-pill bg-light">
          {/* move shiftedBy into utils */}
          <span id="balance">{amount.shiftedBy(-ERC20_DECIMALS).toFixed(2)} </span>
          <span>{symbol}</span>
        </span>
      </>
    );
  }

  return null;
};

export default Balance;
