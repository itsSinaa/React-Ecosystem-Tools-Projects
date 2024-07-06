import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import {
  cartItemsType,
  useShoppingCartContext,
} from "../../context/shoppingCartContext";
import { getSingleProduct } from "../../services/api";
import { Product } from "../../types/types";
import { Link } from "react-router-dom";

const CartItem = ({ id, qty }: cartItemsType) => {
  const {
    handleDecreaseProductQty,
    handleIncreaseProductQty,
    handleRemoveFromCart,
    getProductQty,
  } = useShoppingCartContext();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getSingleProduct(id).then((result) => setProduct(result));
  }, []);

  return (
    <div className="border-b pb-2 mt-4 flex items-center flex-row-reverse">
      <Link to={`/product/${id}`}>
        <img
          className="object-cover rounded w-40"
          src={product?.image}
          alt="amabatukam"
        />
      </Link>
      <div className="mr-4">
        <h2 className="text-right">{product?.title}</h2>

        <div className="mt-2 flex justify-end">
          <Button
            onClick={() => handleRemoveFromCart(id)}
            className="mr-2"
            variant="danger">
            Remove
          </Button>
          <Button
            onClick={() => handleIncreaseProductQty(id)}
            className="!mt-0 !p-2"
            variant="primary">
            +
          </Button>
          <span className="mx-2 flex items-center justify-center">
            {getProductQty(id)}
          </span>
          <Button
            onClick={() => handleDecreaseProductQty(id)}
            className="!mt-0 !p-2"
            variant="primary">
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
