import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { truncateAddress } from "../../utils/utils";

const Address = (props) => {
  // const changeAccount = () => {};

  if (props.address) {
    return (
      <>
        <span
          className="nav-link border rounded-pill btn bg-light"
        >
          <span>{truncateAddress(props.address)}</span>
        </span>
      </>
    );
  }

  return null;
};
export default Address;
