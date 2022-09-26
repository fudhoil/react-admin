import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/style.scss";
import isAuth from "./utils/isAuth";
// import Page404 from "./views/pages/page404/Page404";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// // Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// // Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const App = () => {
  return (
    <Suspense fallback={loading}>
      <Routes>
        {isAuth() ? (
          <>
            <Route path="/logout" name="Logout Page" element={<Login />} />
            <Route
              path="/login"
              name="Login Page"
              element={<DefaultLayout />}
            />
          </>
        ) : (
          <Route path="/login" name="Login Page" element={<Login />} />
        )}
        <Route path="/" element={isAuth() ? <DefaultLayout /> : <Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default App;
