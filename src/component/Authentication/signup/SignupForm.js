import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !mobileNo || !role) {
      setMessage("Please fill in all fields.");
      return;
    }

    const userData = { userName, email, password, mobileNo, role };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/register",
        userData
      );
      setMessage("User registered successfully!");
      localStorage.setItem("token", response.data.token);
      setUsers([...users, response.data.user]);
      navigate("/login"); // Redirect to login page only on successful registration
    } catch (error) {
      setMessage("Error registering user");
      console.error("There was an error!", error);
    }

    // Resetting form fields
    setUserName("");
    setEmail("");
    setPassword("");
    setMobileNo("");
    setRole("");
};

const LoginForm = () => {
    navigate("/login"); // Directly navigating to login page
};

  return (
    <>
      <div id="signup-form" className="container mt-5">
        <div>
          <button
         className="btn btn-success mb-4 "
            onClick={LoginForm}
          >
            log in
          </button>
        </div>
        {message && <p>{message}</p>}
        <div className="card p-5">
          <h2 className="text-center mb-3">SignUp Form</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your Mobile"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="form-select"
              >
                <option value="">Select role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">
              Create Account
            </button>
            <p className="text-center mt-3">
              Clicking <strong>Create Account</strong> means that you agree to
              our <a href="javascript:void(0)">terms of service</a>.
            </p>
            <hr />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
