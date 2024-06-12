import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FormModal from "./component/Authentication/FormModal";
import LoginForm from "./component/Authentication/login/LoginForm";
import SignupForm from "./component/Authentication/signup/SignupForm";
import Registration from "./component/Form/Registration";
import ProtectedRoute from "./component/Authentication/ProtectedRoute";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormModal />} />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <ProtectedRoute path="/register" element={<Registration />} />
          {/* <Route path="/register" element={<Registration />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <FormModal/> */}
    </div>
  );
};

export default App;
