import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userRole, setRole] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminExists, setIsAdminExists] = useState(false);

  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/admin/check");
        setIsAdminExists(response.data.exists);
      } catch (error) {
        console.error("Error checking admin existence:", error);
      }
    };

    checkAdminExists();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateMobileNo = (mobileNo) => {
    return /^\d{10}$/.test(mobileNo);
  };

  const handleUserNameChange = (value) => {
    setUserName(value);
    if (errors.userName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "",
      }));
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (errors.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
  };

  const handleMobileNoChange = (value) => {
    setMobileNo(value);
    if (errors.mobileNo) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNo: "",
      }));
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);
    if (errors.userRole) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userRole: "",
      }));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    let hasErrors = false;

    if (!userName.trim()) {
      formErrors.userName = "Please enter your full name.";
      hasErrors = true;
    }

    if (!email.trim()) {
      formErrors.email = "Please enter your email address.";
      hasErrors = true;
    } else if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
      hasErrors = true;
    }

    if (!password.trim()) {
      formErrors.password = "Please enter your password.";
      hasErrors = true;
    } else if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 8 characters long.";
      hasErrors = true;
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
      hasErrors = true;
    }

    if (!mobileNo.trim()) {
      formErrors.mobileNo = "Please enter your mobile number.";
      hasErrors = true;
    } else if (!validateMobileNo(mobileNo)) {
      formErrors.mobileNo = "Please enter a valid 10-digit mobile number.";
      hasErrors = true;
    }

    if (!userRole.trim()) {
      formErrors.userRole = "Please select a role.";
      hasErrors = true;
    } else if (userRole === "Admin" && isAdminExists) {
      formErrors.userRole = "Role 'Admin' is not applicable for registration.";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      userName,
      email,
      password,
      mobileNo,
      userRole,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/register",
        userData
      );
      setMessage("User registered successfully!");
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorList = error.response.data.error.errorList;
        const newErrors = {};
        errorList.forEach((err) => {
          if (err.includes("user email")) {
            newErrors.email = "This email is already registered.";
          } else if (err.includes("user name")) {
            newErrors.userName = "This username is already taken.";
          } else if (err.includes("phone number")) {
            newErrors.mobileNo = "This mobile number is already registered.";
          } else if (err.includes("user password")) {
            newErrors.password = "This password is already in use.";
          } else if (err.includes("role is not applicable")) {
            newErrors.userRole = "Role 'Admin' is not applicable for registration.";
          }
        });
        setErrors(newErrors);
        // setMessage("Error: Unable to register.");
      } else if (error.request) {
        // setMessage("Error: No response received from server.");
      } else {
        // setMessage("Error: Something went wrong while sending the request.");
      }
    }
  };


  return (
    <>
      <div id="signup-form" className="container mt-5">
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
                onChange={(e) => handleUserNameChange(e.target.value)}
              />
              {errors.userName && (
                <div className="text-danger">{errors.userName}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control password-input"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control password-input"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                <span
                  className="input-group-text toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your Mobile"
                value={mobileNo}
                onChange={(e) => handleMobileNoChange(e.target.value)}
              />
              {errors.mobileNo && (
                <div className="text-danger">{errors.mobileNo}</div>
              )}
            </div>
            <div>
              <select
                value={userRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                required
                className="form-select"
              >
                <option value="">Select role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.userRole && (
                <div className="text-danger">{errors.userRole}</div>
              )}
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">
              Create Account
            </button>
            <p className="text-center mt-3">
              Clicking <strong>Create Account</strong> means that you agree to
              our <a href="javascript:void(0)">terms of service</a>.
              <a href="/login" className=" ms-4">
                Login
              </a>
            </p>
            <hr />
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;

