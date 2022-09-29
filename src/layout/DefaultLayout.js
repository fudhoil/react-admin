import React, { useEffect } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logout } from "src/slices/login";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.login);
  useEffect(() => {
    const isLoggedUser = dispatch(isLoggedIn());
    if (!isLoggedUser) {
      return dispatch(logout());
    }
  }, [dispatch, isLogged]);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
