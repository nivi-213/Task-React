// import React, {  useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./signup.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const SignupForm = () => {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [userRole, setRole] = useState("");
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   // const [showPassword, setShowPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     if (!userName || !email || !password || !mobileNo || !userRole) {
//       setMessage("Please fill in all fields.");
//       return;
//     }

//     const userData = { userName, email, password, mobileNo, userRole };

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/user/register",
//         userData
//       );
//       setMessage("User registered successfully!");
//       localStorage.setItem("token", response.data.token);
//       setUsers([...users, response.data.user]);
//       navigate("/login"); // Redirect to login page only on successful registration
//     } catch (error) {
//       setMessage("Error registering user");
//       console.error("There was an error!", error);
//     }

//     // Resetting form fields
//     setUserName("");
//     setEmail("");
//     setPassword("");
//     setMobileNo("");
//     setRole("");
//   };

//   const LoginForm = () => {
//     navigate("/login"); // Directly navigating to login page
//   };

//   return (
//     <>
//       <div id="signup-form" className="container mt-5">
//         {message && <p>{message}</p>}
//         <div className="card p-5">
//           <h2 className="text-center mb-3">SignUp Form</h2>
//           <form onSubmit={handleSignupSubmit}>
//             <div className="mb-3">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your full name"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-3">
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter your Mobile"
//                 value={mobileNo}
//                 onChange={(e) => setMobileNo(e.target.value)}
//               />
//             </div>

//             <div className="input-group">
//   <input
//     type={showPassword ? "text" : "password"}
//     className="form-control password-input"
//     placeholder="Create password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
//   <span className="toggle-password" onClick={togglePasswordVisibility}>
//     <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
//   </span>
// </div>


//             <div>
//               <select
//                 value={userRole}
//                 onChange={(e) => setRole(e.target.value)}
//                 required
//                 className="form-select"
//               >
//                 <option value="">Select role</option>
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-success w-100 mt-3">
//               Create Account
//             </button>
//             <p className="text-center mt-3">
//               Clicking <strong>Create Account</strong> means that you agree to
//               our <a href="javascript:void(0)">terms of service</a>.
//               <a href="/login" className=" ms-4">
//                 Login
//               </a>
//             </p>
//             <hr />
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignupForm;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userRole, setRole] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Add more complex checks if needed
  };

  const validateMobileNo = (mobileNo) => {
    return /^\d{10}$/.test(mobileNo); // Assuming a 10-digit mobile number
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
    }
    
    if (hasErrors) {
      setErrors(formErrors);
      return;
    }
    
    const userData = { userName, email, password, mobileNo, userRole };
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/user/register",
        userData
      );
      setMessage("User registered successfully!");
      localStorage.setItem("token", response.data.token);
      navigate("/login"); // Redirect to login page only on successful registration
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code that falls out of the range of 2xx
        setMessage(`Error: ${error.response.data.message}`);
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("Error: No response received from server.");
        console.error("No response received from server:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage("Error: Something went wrong while sending the request.");
        console.error("Error during request setup:", error.message);
      }
    }
    
    // Resetting form fields and errors
    setUserName("");
    setEmail("");
    setPassword("");
    setMobileNo("");
    setRole("");
    setErrors({});
    
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
