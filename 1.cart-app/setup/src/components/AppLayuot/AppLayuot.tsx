import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const AppLayuot = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default AppLayuot;
