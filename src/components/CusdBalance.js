import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState } from "react";
import { ERC20_DECIMALS } from "../utils/constants";

const CusdBalance = () => {
  const { address, kit } = useContractKit();
  const [cusdBalance, setcusdBalance] = useState(0);

  const getBalance = async () => {
    const balance = await kit.getTotalBalance(address);
    const _cusdBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    setcusdBalance(_cusdBalance);
  };

  useEffect(() => {
    if (address) getBalance();
  }, [address]);

  if (address) {
    return (
      <>
        <span className="nav-link border rounded-pill bg-light">
          <span id="balance">{cusdBalance}</span>
          cUSD
        </span>
      </>
    );
  }

  return null;
};

export default CusdBalance;
