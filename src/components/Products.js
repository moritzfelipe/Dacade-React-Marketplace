import { useContractKit } from "@celo-tools/use-contractkit";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import {
  contractAddress,
  cUSDContractAddress,
  ERC20_DECIMALS,
} from "../utils/constants";
import AddProduct from "./AddProduct";
import Product from "./Product";
import { RingLoader } from "react-spinners";

import MarketPlaceAbi from "../abis/Marketplace.abi.json";

import erc20ABI from "../abis/ERC20.abi.json";

const Products = ({
  loading,
  setError,
  setLoading,
  setSuccess,
  clearNotifications,
}) => {
  const { performActions, address, getConnectedKit } = useContractKit();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      if (address) getProducts();
    } catch (error) {
      console.log({ error });
      setError(error);
    }
  }, [address]);

  // function to get the list of products from the celo blockchain
  const getProducts = async function () {
    try {
      setLoading("Fetching products");

      const kit = await getConnectedKit();
      const contract = new kit.web3.eth.Contract(
        MarketPlaceAbi,
        contractAddress
      );

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
      const allProducts = await Promise.all(_products);

      setProducts(allProducts);

      clearNotifications();
    } catch (error) {
      setLoading(null);
      console.log({ error });
      // throw Error("Something went wrong. Please refresh and try again");
    }
  };

  const addProduct = async ({ name, image, description, location, price }) => {
    try {
      clearNotifications();

      await performActions(async (kit) => {
        const contract = new kit.web3.eth.Contract(
          MarketPlaceAbi,
          contractAddress
        );

        // get the newly fetched address
        const _address = kit.defaultAccount;

        const priceInWei = new BigNumber(price)
          .shiftedBy(ERC20_DECIMALS)
          .toString();

        await contract.methods
          .writeProduct(name, image, description, location, priceInWei)
          .send({ from: _address });
      });

      getProducts();
      setSuccess("Product added successfully");
    } catch (error) {
      console.log({ error });

      setError("Failed to create a product");
    }
  };

  //  function to initiate transaction
  const buyProduct = async (_index, _price) => {
    try {
      clearNotifications();
      await performActions(async (kit) => {
        const contract = new kit.web3.eth.Contract(
          MarketPlaceAbi,
          contractAddress
        );
        const erc20Contract = new kit.web3.eth.Contract(
          erc20ABI,
          cUSDContractAddress
        );

        // get the newly fetched address
        const _address = kit.defaultAccount;

        await erc20Contract.methods
          .approve(contractAddress, _price)
          .send({ from: _address });

        await contract.methods.buyProduct(_index).send({ from: _address });
        getProducts();
        setSuccess("Product bought successfully");
      });
    } catch (error) {
      console.log({ error });

      setError("Failed to purchase product.");
    }
  };

  return (
    <>
      <div className="mb-4" style={{ marginTop: "4em" }}>
        <a
          className="btn btn-dark rounded-pill"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Add product
        </a>
      </div>
      <main id="marketplace" className="row">
        {!loading && (
          <>
            <AddProduct addProduct={addProduct} />
            {products.map((_product) => (
              <Product
                product={{
                  ..._product,
                }}
                buyProduct={buyProduct}
              />
            ))}
          </>
        )}

        {loading && (
          <div class="d-flex justify-content-center ">
            <RingLoader size={150} />
          </div>
        )}
      </main>
    </>
  );
};
export default Products;
