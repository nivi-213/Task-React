import React from 'react';

const FormToggleButtons = ({ isLogin, toggleLogin, toggleSignup }) => {
    
  return (
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
  );
};

export default FormToggleButtons;
