import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { truncateAddress } from "../utils/utils";

const Address = () => {
  const { address, destroy } = useContractKit();

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
      </>
    );
  }

  return null;
};
export default Address;
