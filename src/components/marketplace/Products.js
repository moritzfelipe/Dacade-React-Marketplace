import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState, useCallback } from "react";
import AddProduct from "./AddProduct";
import Product from "./Product";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { getProducts as getProductList, buyProduct, createProduct } from "../../utils/product";

const Products = (props) => {
  const { performActions, address } = useContractKit();
  const contract = props.marketPlaceContract;

  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  // function to get the list of products from the celo blockchain

  const getProducts = useCallback(
    async () => {
      try {
        setloading(true);
        const allProducts = await getProductList(contract);
        setProducts(allProducts);
      } catch (error) {
        console.log({ error });
      } finally {
        setloading(false);
      }
    },
    [contract],
  );

  const addProduct = async (data) => {
    try {
      setloading(true);
      createProduct(contract, performActions, data);
      getProducts();
      toast.success("Product added successfully");
    } catch (error) {
      console.log({ error });
      toast.error("Failed to create a product");
    } finally {
      setloading(false);
    }
  };

  //  function to initiate transaction
  const buy = async (_index, _price) => {
    try {
      await buyProduct(contract, performActions, {
        index: _index,
        price: _price,
      });
      props.updateBalance();
      getProducts();
      toast.success("Product bought successfully");
    } catch (error) {
      console.log({ error });

      toast.error("Failed to purchase product.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    try {
      if (address && contract) {
        toast.info("Fetching products...");
        getProducts();
        return;
      }
    } catch (error) {
      console.log({ error });
      toast.error(error);
    }
  }, [contract, address, getProducts]);

  return (
    <>
      <div className="mb-4" style={{ marginTop: "4em" }}>
        <span
          className="btn btn-dark rounded-pill"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Add product
        </span>
      </div>
      <main id="marketplace" className="row">
        {!loading ? (
          <>
            <AddProduct addProduct={addProduct} />
            {products.map((_product) => (
              <Product
                product={{
                  ..._product,
                }}
                buyProduct={buy}
              />
            ))}
          </>
        ) : (
          // display loading component
          <Loader />
        )}
      </main>
    </>
  );
};
export default Products;
