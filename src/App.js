import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FormModal from "./component/Authentication/FormModal";
import LoginForm from "./component/Authentication/LoginForm";
import SignupForm from "./component/Authentication/SignupForm";
import Registration from "./component/Form/Registration";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormModal />} />

          <Route path="/login" element={<LoginForm />} />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/register" element={<Registration />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
