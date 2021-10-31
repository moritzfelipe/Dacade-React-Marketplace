import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { disConnectWallet, truncateAddress } from "../utils/utils";

const Account = ({connectCeloWallet}) => {
  const { address, kit, connect, destroy } = useContractKit();

  const changeAccount = () => {};

    const logout = async () => {
      await destroy()
  };

  return address ? (
      <span className="nav-link border rounded-pill btn bg-light" onClick={async () => {
          console.log("clicked!!!");
         await logout()
    }}>
      <span id="balance">{truncateAddress(address)}</span>
    </span>
  ) : (
    <span
      className="nav-link btn border rounded-pill bg-light"
      onClick={connectCeloWallet}
    >
      <span id="balance">Connect Wallet</span>
    </span>
  );
};

export default Account;
