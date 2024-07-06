import React, { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import CartItem from "../../components/cart-item/CartItem";
import Button from "../../components/button/Button";
import { useShoppingCartContext } from "../../context/shoppingCartContext";
import { Product } from "../../types/types";
import { getAllProducts } from "../../services/api";

const Cart = () => {
  const { cartItems, getCartQty } = useShoppingCartContext();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    getAllProducts().then((result) => setProducts(result));
  }, []);

  return (
    <Container>
      {cartItems.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <div className="bg-gray-200 text-right p-4">
        <p>total item in cart : {getCartQty}</p>
        <p>
          total price :{" "}
          {cartItems.reduce((total, cartItem) => {
            const item = products?.find(
              (product) => parseInt(product.id as string) === cartItem.id
            );

            return total + (item?.price || 0) * cartItem.qty;
          }, 0).toLocaleString()}$
        </p>
      </div>
      <Button variant="success">Check out</Button>
    </Container>
  );
};

export default Cart;
