import React from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useShoppingCartContext } from "../../context/shoppingCartContext";

const Navbar = () => {
  const { getCartQty } = useShoppingCartContext();

  return (
    <header className="p-4 shadow border">
      <Container>
        <nav className="flex items-center justify-between flex-row-reverse">
          <ul className="flex items-center gap-3 flex-row-reverse">
            <li>
              <Link to="/">خانه</Link>
            </li>
            <li>
              <Link to="store">فروشگاه</Link>
            </li>
          </ul>

          <Link to="/cart">
            <button className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {getCartQty !== 0 ? (
                <span className="absolute top-0 -right-1.5 bg-red-500 text-white rounded-full size-5 text-xs flex items-center justify-center">
                  {getCartQty}
                </span>
              ) : (
                ""
              )}
            </button>
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
