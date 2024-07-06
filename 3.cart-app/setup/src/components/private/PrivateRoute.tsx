import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLogin = true;

  return <div>{isLogin ? <Outlet /> : <Navigate to="/"/>}</div>;
};

export default PrivateRoute;
