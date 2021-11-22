
import {
    contractAddress,
    cUSDContractAddress,
    ERC20_DECIMALS,
  } from "../utils/constants";
  import erc20ABI from "../abis/ERC20.abi.json";
import BigNumber from "bignumber.js";

export const createProduct = async(
 contract, performActions,{ name, image, description, location, price })=>{
    await performActions(async (kit) => {

        // get the newly fetched address
        const _address = kit.defaultAccount;

        const priceInWei = new BigNumber(price)
          .shiftedBy(ERC20_DECIMALS)
          .toString();

        await contract.methods
          .writeProduct(name, image, description, location, priceInWei)
          .send({ from: _address });
    });
}

export const getProducts = async (contract) => {
    const _productsLength = await contract.methods.getProductsLength().call();
    const _products = [];

    for (let i = 0; i < _productsLength; i++) {
        let _product = new Promise(async (resolve, reject) => {
            let p = await contract.methods.readProduct(i).call();
            resolve({
                index: i,
                owner: p[0],
                name: p[1],
                image: p[2],
                description: p[3],
                location: p[4],
                price: new BigNumber(p[5]),
                sold: p[6],
            });
        });
        _products.push(_product);
    }
    return Promise.all(_products);
};

export const buyProduct = async (contract, performActions, {
    index,
    price
})=> {
    await performActions(async (kit) => {
        const erc20Contract = new kit.web3.eth.Contract(
          erc20ABI,
          cUSDContractAddress
        );

        // get the newly fetched address
        const _address = kit.defaultAccount;

        await erc20Contract.methods
          .approve(contractAddress, price)
          .send({ from: _address });

        // await buyProduct(contract, _index);
        await contract.methods.buyProduct(index).send({ from: _address });
      });
}