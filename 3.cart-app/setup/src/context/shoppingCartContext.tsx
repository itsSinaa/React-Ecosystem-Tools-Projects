import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type cartItemsType = {
  id: number;
  qty: number;
};

type shoppingCartContextType = {
  cartItems: cartItemsType[];
  handleIncreaseProductQty: (id: number) => void;
  handleDecreaseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  handleRemoveFromCart: (id: number) => void;
  getCartQty: number;
};

type ShoppingCartProviderChildren = {
  children: React.ReactNode;
};

export const ShoppingCartContext = createContext({} as shoppingCartContextType);
// we can use the empty obj tp bypass the strcition of typescript and define the initial value of the context later or we can define the initial value

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderChildren) => {
  const [cartItems, setCartItems] = useLocalStorage<cartItemsType[]>(
    "cartItems",
    []
  );

  const handleIncreaseProductQty = (id: number) => {
    setCartItems((currentItem) => {
      const selectedItem = currentItem.find((item) => item.id == id);

      if (selectedItem == null) {
        return [...currentItem, { id: id, qty: 1 }];
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const handleDecreaseProductQty = (id: number) => {
    setCartItems((currentItem) => {
      const selectedItem = currentItem.find((item) => item.id == id);

      if (selectedItem?.qty === 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id == id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getProductQty = (id: number): number => {
    const selectedItem = cartItems.find((item) => item.id == id);

    if (selectedItem) {
      return selectedItem.qty;
    } else {
      return 0;
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  };

  const getCartQty = cartItems.reduce(
    (currentQty, item) => currentQty + item.qty,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        getProductQty,
        handleRemoveFromCart,
        getCartQty,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
