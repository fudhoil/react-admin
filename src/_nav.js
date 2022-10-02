import React from "react";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { cilHome, cilEnvelopeClosed } from "@coreui/icons";

const _nav = [
  {
    component: CNavItem,
    name: "Home",
    to: "/home",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },
  {
    component: CNavItem,
    name: "Submitions",
    to: "/submitions",
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Registers",
    to: "/registers",
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: "Theme",
  // },
  // {
  //   component: CNavGroup,
  //   name: "Buttons",
  //   to: "/buttons",
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Buttons",
  //       to: "/buttons/buttons",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Buttons groups",
  //       to: "/buttons/button-groups",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Dropdowns",
  //       to: "/buttons/dropdowns",
  //     },
  //   ],
  // },
];

export default _nav;
