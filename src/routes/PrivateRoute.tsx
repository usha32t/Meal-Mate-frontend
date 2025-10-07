import React from "react";
import type { ReactNode } from "react"; // type-only import
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  // no need to declare `children` here if using React.FC
  children?: ReactNode; // optional if you want
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
