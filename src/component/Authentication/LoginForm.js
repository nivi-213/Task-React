import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // UseEffect to check if token exists in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect user to another page if token exists
      navigate("/");
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/login",
        {
          userName: fullName,
          password: password,
        }
      );
      // Store token in local storage
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard or any other authenticated page
      navigate("/register");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error.message);
      } else {
        setMessage("Error logging in. Please try again later.");
      }
    }
    // Clear input fields
    setFullname("");
    setPassword("");
  };

  return (
    <div id="login-form">
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter email or username"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
        <p className="text-center mt-3">
          <a href="javascript:void(0)">Forgotten account</a>
        </p>
        <hr />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
