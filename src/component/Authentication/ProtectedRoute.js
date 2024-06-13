import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null; // Render nothing while redirecting
  }

  return children;
};

export default ProtectedRoute;
