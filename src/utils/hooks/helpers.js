import { useState, useEffect, useCallback } from 'react';
import { useContractKit } from "@celo-tools/use-contractkit";

// add useAccountSubscription that checks if the user changes their account

// maybe add funcitonality to pass address as a parameter
export const useBalance = () => {
  const { address, kit } = useContractKit();
  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    const balance = await kit.getTotalBalance(address);
    setBalance(balance);
  }, [address, kit])
  // look into isMounted from https://usehooks-ts.com/

  useEffect(() => {
    if (address) getBalance();
  }, [address, getBalance]);

  return {
    balance,
    getBalance
  };
};

export const useContract = (abi, contractAddress) => {
  const { getConnectedKit, address } = useContractKit();
  const [marketPlaceContract, setMarketPlaceContract] = useState(0);

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();

    const contract = new kit.web3.eth.Contract(
      abi,
      contractAddress
    );

    setMarketPlaceContract(contract);
  }, [getConnectedKit, abi, contractAddress]);

  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return marketPlaceContract;
};

export const useConnected = () => {
  const { address } = useContractKit();
  return address ? true : false;
};