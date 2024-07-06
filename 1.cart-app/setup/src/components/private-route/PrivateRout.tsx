import React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

export type AuthInfo = {
  isLogin: boolean;
  userName: string;
  password: string;
};

const PrivateRoute = () => {
  const isAuthenticated = JSON.parse(
    localStorage.getItem("auth") as string
  ) as AuthInfo;

  return <>{isAuthenticated.isLogin ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
