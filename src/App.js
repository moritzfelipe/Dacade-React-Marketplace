import "./App.css";
import Products from "./components/Products";
import React, { useState, useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

import MarketPlaceAbi from "./abis/Marketplace.abi.json";

import erc20ABI from "./abis/ERC20.abi.json";
import {
  ErrorNotification,
  LoadingNotification,
  SuccessNotification,
} from "./components/Notifications";
import Balance from "./components/Balance";
import { contractAddress, cUSDContractAddress } from "./utils/constants";
import "@celo-tools/use-contractkit/lib/styles.css";
import Account from "./components/Account";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { address, connect, kit, getConnectedKit, networkId } =
    useContractKit();

  const [contract, setcontract] = useState(null);
  const [ercContract, setErcContract] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const connectCeloWallet = async () => {
    try {
      setLoading("Connecting to the celo blockchain");
      if (!address) {
        try {
          await connect();
        } catch (error) {
          clearNotifications()
          setError("failed to connect to the blockchain");
        }

        // subscribeProvider();
      } else {
        await getConnectedKit();
      }

      const contract = new kit.web3.eth.Contract(
        MarketPlaceAbi,
        contractAddress
      );
      const erc20Contract = new kit.web3.eth.Contract(
        erc20ABI,
        cUSDContractAddress
      );
      const provider = kit.web3.currentProvider;
      console.log({provider});
      await subscribeProvider(provider);
      setcontract(contract);
      setErcContract(erc20Contract);

      setLoading("Connected successfully");
      clearNotifications();
    } catch (error) {
      console.log({ error });
      clearNotifications();
      setError(error.message);
    }
  };

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

 
    provider.on("accountsChanged", async (accounts) => {

      try {
        console.log("account changed ", { accounts });
      await getConnectedKit();
      } catch (error) {
        console.log({error});
      }
   
    });

  };

  const clearNotifications = () => {
    setError(false);
    setSuccess(false);
    setLoading(false);
  };

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    connectCeloWallet();
  }, []);

  return (
    <>
      
      <ToastContainer />
      <div className="container mt-2" style={{ maxWidth: "72em" }}>
        <nav className="navbar bg-white navbar-light">
          <div className="container-fluid">
            <span className="navbar-brand m-0 h4 fw-bold">
              Dacade Marketplace
            </span>
            <Account connectCeloWallet = {connectCeloWallet} />
            <Balance />
          </div>
        </nav>

        {loading && <LoadingNotification message={loading} />}

        {error && <ErrorNotification message={error} />}

        {success && <SuccessNotification message={success} />}

        <Products
          contract={contract}
          ercContract={ercContract}
          clearNotifications={clearNotifications}
          setLoading={setLoading}
          setError={setError}
          setSuccess={setSuccess}
        />
      </div>
    </>
  );
};

export default App;
  