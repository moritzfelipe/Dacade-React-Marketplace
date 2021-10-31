import { useContractKit } from "@celo-tools/use-contractkit";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { contractAddress, ERC20_DECIMALS } from "../utils/constants";
import AddProduct from "./AddProduct";
import Product from "./Product";

const Products = ({
  contract,
  ercContract,
  setError,
  setLoading,
  setSuccess,
  clearNotifications,
}) => {
  const { performActions, address, kit } = useContractKit();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      if (contract) getProducts();
    } catch (error) {
      console.log({ error });
      setError(error);
    }
  }, [contract]);

  // function to get the list of products from the celo blockchain
  const getProducts = async function () {
    try {
      setLoading("Fetching products");
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
      console.log({error});
      throw Error("Something went wrong. Please refresh and try again");
    }
  };

  const addProduct = async ({ name, image, description, location, price }) => {
    try {
      clearNotifications();

      await performActions(async () => {
        console.log({ kit });
        const priceInWei = new BigNumber(price)
          .shiftedBy(ERC20_DECIMALS)
          .toString();

        await contract.methods
          .writeProduct(name, image, description, location, priceInWei)
          .send({ from: address });
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
      await performActions(async () => {
        await ercContract.methods
          .approve(contractAddress, _price)
          .send({ from: address });

        await contract.methods.buyProduct(_index).send({ from: address });
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
        {products.map((_product) => (
          <Product
            product={{
              ..._product,
            }}
            buyProduct={buyProduct}
          />
        ))}

        <AddProduct addProduct={addProduct} />
      </main>
    </>
  );
};
export default Products;
