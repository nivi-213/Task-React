import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormModal.css"; // Optional: CSS file for additional styling
import FormToggleButtons from "./FormToggleButtons";
import LoginForm from "./login/LoginForm";
import SignupForm from "./signup/SignupForm";

const FormModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleSignup = () => {
    setIsLogin(false);
    navigate("/signup"); // Navigate to the signup page
  };

  const toggleLogin = () => {
    setIsLogin(true);
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="form-modal container mt-5">
      <FormToggleButtons
        isLogin={isLogin}
        toggleSignup={toggleSignup}
        toggleLogin={toggleLogin}
      />

      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
};

export default FormModal;
