import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/pages/home/Home"));
const Submissions = React.lazy(() =>
  import("./views/pages/submissions/Submissions")
);
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

const routes = [
  { path: "/home", exact: true, name: "Home", element: Home },
  {
    path: "/submissions",
    exact: true,
    name: "Submissions",
    element: Submissions,
  },
  {
    path: "/*",
    name: "Page404",
    element: Page404,
  },
  //   { path: "/dashboard", name: "Dashboard", element: Dashboard },
];

export default routes;
