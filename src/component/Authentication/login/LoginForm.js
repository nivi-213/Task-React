import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginForm = () => {
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // navigate("/register"); 
    }
  }, [navigate]);

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
  
      localStorage.setItem("token", response.data.token);
      // Check if response status is successful
      if (response.status === 200) {
        navigate("/register"); // Navigate if successful
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setMessage("Invalid username or password. Please try again.");
        } else if (error.response.status === 400) {
          setMessage("Invalid request. Please check your input.");
        } else {
          setMessage("An error occurred. Please try again later.");
        }
      } else {
        setMessage("Network error. Please check your connection.");
      }
    }
  
    setFullname("");
    setPassword("");
  };
  
  return (
    <div id="login-form" className="container">
      <div className="card p-5">
        <form onSubmit={handleLoginSubmit} className="">
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
            <a href="javascript:void(0)" className="text-decoration-none">Forgotten account</a>
          </p>
          <hr />
          {message && <p className="text-danger">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
