import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState } from "react";
import { truncateAddress } from "../utils/utils";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ERC20_DECIMALS } from "../utils/constants";

const Account = ({ connectCeloWallet }) => {
  const [cUSDBalance, setcUSDBalance] = useState(0);

  const { address, kit, destroy } = useContractKit();

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

  const changeAccount = () => {};

  const logout = async () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to disconnect your wallet?.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await destroy();
            setcUSDBalance(0);
          },
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  if (address) {
    return (
      <>
        <span
          className="nav-link border rounded-pill btn bg-light"
          onClick={async () => {
            await logout();
          }}
        >
          <span id="balance">{truncateAddress(address)}</span>
        </span>

        <span className="nav-link border rounded-pill bg-light">
          <span id="balance">{cUSDBalance}</span>
          cUSD
        </span>
      </>
    );
  } else {
    return (
      <span
        className="nav-link btn border rounded-pill bg-light"
        onClick={connectCeloWallet}
      >
        <span id="balance">Connect Wallet</span>
      </span>
    );
  }
};

export default Account;
