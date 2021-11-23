// import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect } from "react";
// import { toast } from "react-toastify";

const ConnectWallet = (props) => {

  if (!props.address) {
    return (
      <span
        className="nav-link btn border rounded-pill bg-light"
        onClick={props.connect}
      >
        <span id="balance">Connect Wallet</span>
      </span>
    );
  }
  return null;
};

export default ConnectWallet;
