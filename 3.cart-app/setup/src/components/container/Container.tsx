import React from "react";

type ChildrenComponents = {
  children: React.ReactNode;
};

const Container = ({ children }: ChildrenComponents) => {
  return <div className="container">{children}</div>;
};

export default Container;
