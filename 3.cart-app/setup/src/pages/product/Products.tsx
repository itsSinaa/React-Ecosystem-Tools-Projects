import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import { Product } from "../../types/types";
import { getSingleProduct } from "../../services/api";
import { useParams } from "react-router-dom";
import { useShoppingCartContext } from "../../context/shoppingCartContext";

const Products = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getSingleProduct(id as string).then((result) => setProduct(result));
  }, []);

  const {
    cartItems,
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    getProductQty,
    handleRemoveFromCart,
  } = useShoppingCartContext();

  console.log(cartItems);

  return (
    <Container>
      <div className="grid grid-cols-12  shadow border gap-3 mt-5">
        <div className="col-span-10 text-right p-5">
          <div className="flex items-start justify-between">
            <span>{product?.title}</span>
            <span>{product?.price.toLocaleString()}$</span>
          </div>
          <p>{product?.description}</p>
        </div>
        <div className="col-span-2 bg-sky-400 p-4 flex flex-col items-center">
          <img
            className="object-cover w-full h-auto rounded"
            src={product?.image}
            alt={product?.title}
          />

          {getProductQty(parseInt(id as string)) === 0 ? (
            <Button
              onClick={() => handleIncreaseProductQty(parseInt(id as string))}
              className="w-full mt-3"
              variant="primary">
              Add to Cart
            </Button>
          ) : (
            <>
              <div className="w-full grid grid-cols-3 content-center">
                <Button
                  onClick={() =>
                    handleIncreaseProductQty(parseInt(id as string))
                  }
                  className="mt-3 w-full"
                  variant="primary">
                  +
                </Button>

                <span className="flex items-center justify-center text-white mt-3">
                  {getProductQty(parseInt(id as string))}
                </span>

                <Button
                  onClick={() =>
                    handleDecreaseProductQty(parseInt(id as string))
                  }
                  className="mt-3 w-full"
                  variant="primary">
                  -
                </Button>
              </div>

              <Button
                onClick={() => handleRemoveFromCart(parseInt(id as string))}
                className="mt-3 w-full"
                variant="danger">
                Remove
              </Button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Products;
