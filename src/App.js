import React, { Component, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./scss/style.scss";
import isAuth from "./utils/isAuth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// // Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// // Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));

const App = () => {
  return (
    <Routes>
      {isAuth() ? (
        <>
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/logout" name="Logout Page" element={<Login />} />
        </>
      ) : (
        <Route path="/login" name="Login Page" element={<Login />} />
      )}
      <Route
        path="*"
        element={
          isAuth() ? (
            <DefaultLayout path="/" to="/" />
          ) : (
            <Login path="/login" to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
