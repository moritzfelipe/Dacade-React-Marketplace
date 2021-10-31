import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState } from "react";
import { ERC20_DECIMALS } from "../utils/constants";

const Balance = () => {
  const [cUSDBalance, setcUSDBalance] = useState(0);

  const { address, kit } = useContractKit();

  const getBalance = async () => {
    const balance = await kit.getTotalBalance(address);
    const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    setcUSDBalance(USDBalance);
  };

  useEffect(() => {
    if (address) {
      getBalance();
    }
  }, [address]);

  return (
    <span className="nav-link border rounded-pill bg-light">
      <span id="balance">{cUSDBalance}</span>
      cUSD
    </span>
  );
};

export default Balance;
