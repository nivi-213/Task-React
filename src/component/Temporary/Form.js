import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormModal.css'; // Optional: CSS file for additional styling

const FormModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(''); // initialize email state to empty string
  const [password, setPassword] = useState(''); // initialize password state to empty string

  const toggleSignup = () => {
    setIsLogin(false);
  };

  const toggleLogin = () => {
    console.log('Login button clicked');
    setIsLogin(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault(); 
    console.log('Email:', email, 'Password:', password);
      setEmail("");
      setPassword("");
  };

  return (
    <div className="form-modal container mt-5">
      <div className="form-toggle d-flex justify-content-center mb-3">
        <button
          id="login-toggle"
          className={`btn ${isLogin ? 'btn-success' : 'btn-light'} mx-1`}
          onClick={toggleLogin}
        >
          log in
        </button>
        <button
          id="signup-toggle"
          className={`btn ${isLogin ? 'btn-light' : 'btn-success'} mx-1`}
          onClick={toggleSignup}
        >
          sign up
        </button>
      </div>

      {isLogin ? (
        <div id="login-form">
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // update email state on change
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // update password state on change
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              login
            </button>
            <p className="text-center mt-3">
              <a href="javascript:void(0)">Forgotten account</a>
            </p>
            <hr />
          </form>
        </div>
      ) : (
        <div id="signup-form">
          <form>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Choose username" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Create password" />
            </div>
            <button type="button" className="btn btn-success w-100">create account</button>
            <p className="text-center mt-3">
              Clicking <strong>create account</strong> means that you agree to our <a href="javascript:void(0)">terms of services</a>.
            </p>
            <hr />
          </form>
        </div>
      )}
    </div>
  );
};

export default FormModal;
