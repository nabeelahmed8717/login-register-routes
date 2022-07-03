import "./App.css";

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/signUp/SignUp";
import SignIn from "./components/auth/signIn/SignIn";
import Header from "./components/layout/header/Header";
import Home from "./components/home/Home";

function App() {
  return (
    <React.Fragment>
      <Header />

      <Routes>
        <Route path="/" exact element={<Navigate to="/SignIn" />} />
        <Route path="/SignIn" exact element={<SignIn />} />
        <Route path="/SignUp" exact element={<SignUp />} />
        <Route path="/Home" exact element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
