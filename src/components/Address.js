<<<<<<< HEAD
import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
=======
import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";// Import css
>>>>>>> 85dbee6156e9f2bebccaf6c2f812f39bb7238250
import { truncateAddress } from "../utils/utils";

const Address = (props) => {
  // const changeAccount = () => {};

<<<<<<< HEAD
  if (props.address) {
    return (
      <>
        <span
          className="nav-link border rounded-pill btn bg-light"
        >
          <span>{truncateAddress(props.address)}</span>
=======
  const changeAccount = () => {};


  if (address) {
    return (
      <>
        <span className="nav-link border rounded-pill btn bg-light">
          <span id="balance">{truncateAddress(address)}</span>
>>>>>>> 85dbee6156e9f2bebccaf6c2f812f39bb7238250
        </span>
      </>
    );
  }

  return null;
};
export default Address;
