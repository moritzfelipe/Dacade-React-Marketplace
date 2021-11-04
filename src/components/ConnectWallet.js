import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
const ConnectWallet = () => {
  const { address, kit, getConnectedKit, connect } = useContractKit();

  const connectCeloWallet = async () => {
    try {
      if (address) return;

      toast.info("Connecting to the Celo Blockchain");
      try {
        await connect();
        return;
      } catch (error) {
        toast.error(error.message);
      }

      await getConnectedKit();

      const provider = kit.web3.currentProvider;

      await subscribeProvider(provider);
      toast.success("Connected successfully");
    } catch (error) {
      console.log({ error });
      toast.error(error.message);
    }
  };

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on("accountsChanged", async (accounts) => {
      try {
        const address = accounts[0];
        kit.defaultAccount = address;
        await getConnectedKit();
      } catch (error) {
        console.log({ error });
      }
    });
  };

  useEffect(() => {
    console.log("use effect");
    if (!address) {
      return connectCeloWallet();
    }
  }, []);

  if (!address) {
    return (
      <span
        className="nav-link btn border rounded-pill bg-light"
        onClick={connectCeloWallet}
      >
        <span id="balance">Connect Wallet</span>
      </span>
    );
  }
  return null;
};

export default ConnectWallet;
