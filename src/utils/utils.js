export const truncateAddress = (address) => {
  return (
    address.slice(0, 5) +
    "..." +
    address.slice(address.length - 4, address.length)
  );
};

// export const disConnectWallet = async (provider) => {
//   console.log({ provider });
//   if (provider.close) {
//     console.log("closing");
//     await provider.close();
//   }

//   console.log("clearing");
//   localStorage.clear();
// };

