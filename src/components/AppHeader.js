import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import { setSidebarShow } from "src/slices/sidebar";
import { fetchUser } from "src/slices/user";

const AppHeader = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebar.sidebarShow);
  const { user, status } = useSelector((state) => state.user);
  const [userName, setUserName] = React.useState("");
  const fullName = "";
  // setUserName(fullName.trim().substring(0, 20) + "...");

  useEffect(() => {
    dispatch(fetchUser());
    if (status === "succeeded") {
      const fullName = user.first_name + " " + user.last_name;
      if (fullName.length > 20) {
        setUserName(fullName.trim().substring(0, 15) + "...");
      } else {
        setUserName(user.first_name + " " + user.last_name);
      }
    }
  }, [status]);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setSidebarShow({ sidebarShow: !show }))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              <CImage
                width={270}
                fluid
                src={process.env.PUBLIC_URL + "/logo-negative.png"}
              />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <CNavItem className="pt-2">
            Welcome,{" "}
            <CTooltip content={fullName} placement="bottom">
              <b>{userName}</b>
            </CTooltip>
          </CNavItem>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
