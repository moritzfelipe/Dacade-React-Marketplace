import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";

import Products from "./components/Products";
import React from "react";

import Notification from "./components/Notifications";
import Address from "./components/Address";
import CusdBalance from "./components/CusdBalance";
import Title from "./components/Title";
import ConnectWallet from "./components/ConnectWallet";

const App = () => {
  return (
    <>
      {/* notification library */}
      <Notification />

      <div className="container mt-2" style={{ maxWidth: "72em" }}>
        <nav className="navbar bg-white navbar-light">
          <div className="container-fluid">
            <Title />
            <Address />
            <CusdBalance />
            <ConnectWallet />
          </div>
        </nav>

        <Products />
      </div>
    </>
  );
};

export default App;
