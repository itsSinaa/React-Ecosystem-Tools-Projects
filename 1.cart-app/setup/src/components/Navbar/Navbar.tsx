import { Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { AuthInfo } from "../private-route/PrivateRout";

const Navbar = () => {
  const location = useLocation();

  const cartQty = useAppSelector((state) =>
    state.product.userCart.reduce((currentItem, cartItem) => {
      return currentItem + cartItem.qty || 0;
    }, 0)
  );

  let isAuthenticated = (JSON.parse(
    localStorage.getItem("auth") as string
  ) as AuthInfo) || { isLogin: false, password: null, userName: null };

  useEffect(() => {
    isAuthenticated = (JSON.parse(
      localStorage.getItem("auth") as string
    ) as AuthInfo) || { isLogin: false, password: null, userName: null };
  }, [location]);

  return (
    <header className="bg-[#1e293b] p-2">
      <Container maxWidth="xl">
        <nav className="flex items-center justify-between flex-row-reverse">
          <div className="flex items-center flex-row-reverse gap-4">
            <Link to="/">
              <button className="text-white bg-sky-900 p-2 rounded">
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
              </button>
            </Link>
            <ul className="flex gap-3 flex-row-reverse text-white font-medium">
              <li>
                <NavLink
                  className={({ isActive }: any) =>
                    isActive ? "underline" : ""
                  }
                  to="/"
                  end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }: any) =>
                    isActive ? "underline" : ""
                  }
                  to="store">
                  Store
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }: any) =>
                    isActive ? "underline" : ""
                  }
                  to="about">
                  About-us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center text-white">
            {isAuthenticated.isLogin ? (
              <Link className="relative" to="cart">
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <span className="absolute bg-red-500 top-0 -right-1 text-xs size-[18px] flex items-center justify-center rounded-full">
                  {cartQty}
                </span>
              </Link>
            ) : (
              <Link
                className="shadow p-2 bg-sky-700 rounded border border-none"
                to="login">
                login
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
