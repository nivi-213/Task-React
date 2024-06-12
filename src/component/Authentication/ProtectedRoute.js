import React from "react";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ component: Component, history, ...rest }) => {
    const isAuthenticated = localStorage.getItem("token");
    const navigate= useNavigate()
  if (!isAuthenticated) {
    navigate("/login");
    return null; // Render nothing while redirecting
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
