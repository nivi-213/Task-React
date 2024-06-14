import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginForm from "./component/Authentication/login/LoginForm";
import SignupForm from "./component/Authentication/signup/SignupForm";
import Registration from "./component/Form/Registration";

import UserTable from "./component/Form/UserTable";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<FormModal />} /> */}
          <Route path="/" element={<Navigate to={"signup"} />} />



          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
      
          <Route path="/usertable" element={<Registration />} />
          <Route path="/admintable" element={<UserTable />} />

       
        </Routes>
      </BrowserRouter>
      {/* <FormModal/> */}
    </div>
  );
};

export default App;
