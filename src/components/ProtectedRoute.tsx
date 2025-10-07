import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, adminOnly }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (adminOnly && userRole !== "admin") return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default ProtectedRoute;
