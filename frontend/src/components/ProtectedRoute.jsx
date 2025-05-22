// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && (!user.roles || !user.roles.includes("ROLE_ADMIN"))) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;