import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";// Import css
import { truncateAddress } from "../utils/utils";

const Address = () => {
  const { address, destroy } = useContractKit();

  const changeAccount = () => {};


  if (address) {
    return (
      <>
        <span className="nav-link border rounded-pill btn bg-light">
          <span id="balance">{truncateAddress(address)}</span>
        </span>
      </>
    );
  }

  return null;
};
export default Address;
