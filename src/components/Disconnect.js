import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css


// use the component from discord
const Disconnect = ({ address, destroy}) => {
  // const changeAccount = () => {};

  const logout = () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to disconnect your wallet?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
           destroy();
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
          onClick={logout}
        >
          <span>Disconnect</span>
        </span>
      </>
    );
  }

  return null;
};
export default Disconnect;
