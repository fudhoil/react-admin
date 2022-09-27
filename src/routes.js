import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/pages/home/Home"));

const routes = [
  { path: "/", exact: true, name: "Home", element: Home },
  //   { path: "/dashboard", name: "Dashboard", element: Dashboard },
];

export default routes;
