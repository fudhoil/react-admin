import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/pages/home/Home"));
const Submitions = React.lazy(() =>
  import("./views/pages/submitions/Submitions")
);
const Registers = React.lazy(() => import("./views/pages/registers/Registers"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const routes = [
  { path: "/home", exact: true, name: "Home", element: Home },
  {
    path: "/submitions",
    exact: true,
    name: "Submitions",
    element: Submitions,
  },
  {
    path: "/registers",
    exact: true,
    name: "Registers",
    element: Registers,
  },
  {
    path: "/*",
    name: "Page404",
    element: Page404,
  },
  //   { path: "/dashboard", name: "Dashboard", element: Dashboard },
];

export default routes;
