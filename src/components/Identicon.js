import React from "react";
import Identicon from "react-hooks-identicons";

const Identicons = ({ address, size }) => {
  return <Identicon size={size || 60} string={address || "Helloworld"} />;
};

export default Identicons;
