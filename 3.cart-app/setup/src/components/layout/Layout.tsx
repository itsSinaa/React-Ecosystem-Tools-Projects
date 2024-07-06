import React from "react";
import Navbar from "../navbar/Navbar";

type ChildrenComponents = {
  children: React.ReactNode;
};

const Layout = ({ children }: ChildrenComponents) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
