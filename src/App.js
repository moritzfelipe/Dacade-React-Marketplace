import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";

import { useContractKit } from "@celo-tools/use-contractkit";

import Products from "./components/Products";
import React from "react";

import Notification from "./components/Notifications";
import Address from "./components/Address";
import Balance from "./components/Balance";
import ConnectWallet from "./components/ConnectWallet";
<<<<<<< HEAD
import Disconnect from "./components/Disconnect";

import { useBalance } from "./utils/hooks";
import { useMarketPlaceContract } from "./utils/hooks";
=======
import DisconnectWallet from "./components/DisconnectWallet";
>>>>>>> 85dbee6156e9f2bebccaf6c2f812f39bb7238250

const App = () => {
  // create a loading state (not now)
  // create a connected state (add)
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  // probably we should just get useContract and have the contract as a param
  const marketPlaceContract = useMarketPlaceContract();
  // console.log(`app.js ${address}`);
  return (
    <>
      <Notification />

      <div className="container mt-2" style={{ maxWidth: "72em" }}>

        {/* maybe use composition for navbar */}
        <nav className="navbar bg-white navbar-light">
          <div className="container-fluid">
<<<<<<< HEAD
            <span className="navbar-brand m-0 h4 fw-bold">
              Dacade Marketplace
            </span>
            <Address
              address={address}
            />
            <Balance
              amount={balance.cUSD}
              symbol="cUSD"
            />
            <ConnectWallet
              address={address}
              connect={connect}
            />
            <Disconnect
              address={address}
              destroy={destroy}
            />
=======
            <Title />
            <Address />
            <ConnectWallet />
            <DisconnectWallet />
            <CusdBalance />
>>>>>>> 85dbee6156e9f2bebccaf6c2f812f39bb7238250
          </div>
        </nav>

        <Products
          updateBalance={getBalance}
          marketPlaceContract={marketPlaceContract}
        />
      </div>
    </>
  );
};

export default App;
