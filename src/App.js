import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/style.scss";
import isAuth from "./utils/isAuth";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logout } from "src/slices/login";
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
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.login);
  const { error: errorRegister } = useSelector((state) => state.registers);
  const { error: errorSubmission } = useSelector((state) => state.submitions);
  useEffect(() => {
    dispatch(isLoggedIn());
    if (!isLogged || errorRegister || errorSubmission) {
      dispatch(logout());
    }
  }, [isLogged]);
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
        <Route path="*" element={isAuth() ? <DefaultLayout /> : <Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
