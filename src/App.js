import "./App.css";
import Products from "./components/Products";
import React, { useState, useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

import {
  ErrorNotification,
  LoadingNotification,
  SuccessNotification,
} from "./components/Notifications";
import "@celo-tools/use-contractkit/lib/styles.css";
import Account from "./components/Account";

const App = () => {
  const { address, connect, kit, getConnectedKit } = useContractKit();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectCeloWallet = async () => {
    try {
      setLoading("Connecting to the celo blockchain");
      if (!address) {
        setTimeout(async () => {
          try {
            await connect();
            return;
          } catch (error) {
            console.log({ error });
            clearNotifications();
            setError("failed to connect to the blockchain");
          }
        }, 1000);

        // subscribeProvider();
      }

      await getConnectedKit();

      const provider = kit.web3.currentProvider;

      await subscribeProvider(provider);
      setLoading("Connected successfully");
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
        const address = accounts[0]
        kit.defaultAccount = address
        await getConnectedKit();
      } catch (error) {
        console.log({ error });
      }
    });
  };

  const clearNotifications = () => {
    setError(false);
    setSuccess(false);
    setLoading(false);
  };

  useEffect(() => {
    connectCeloWallet();
  }, []);

  return (
    
    <>

      <div className="container mt-2" style={{ maxWidth: "72em" }}>
        <nav className="navbar bg-white navbar-light">
          <div className="container-fluid">
            <span className="navbar-brand m-0 h4 fw-bold">
              Dacade Marketplace
            </span>
            <Account connectCeloWallet={connectCeloWallet} />
          </div>
        </nav>

        {loading && <LoadingNotification message={loading} />}

        {error && <ErrorNotification message={error} />}

        {success && <SuccessNotification message={success} />}

        <Products
          clearNotifications={clearNotifications}
          setLoading={setLoading}
          setError={setError}
          setSuccess={setSuccess}
          loading = {loading}
        />
      </div>
    </>
  );
};

export default App;
