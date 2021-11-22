import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const DisconnectWallet = () => {
  const { address, destroy } = useContractKit();

  const logout = async () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to disconnect your wallet?.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await destroy();
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
      <span
        className="nav-link btn border rounded-pill bg-light"
        onClick={logout}
      >
        <span id="balance">Disconnect Wallet</span>
      </span>
    );
  }
  return null;
};

export default DisconnectWallet;
