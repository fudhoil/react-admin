import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "src/assets/brand/logo-negative";
import { sygnet } from "src/assets/brand/sygnet";
import "src/assets/brand/logo-negative.png";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { setSidebarShow, setSidebarUnfoldable } from "src/slices/sidebar";

// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  const show = useSelector((state) => state.sidebar.sidebarShow);
  const dispatch = useDispatch();

  const handleToggleUnfoldable = () => {
    dispatch(setSidebarUnfoldable({ sidebarUnfoldable: !unfoldable }));
  };

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={show}
      color="primary"
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <CImage
          width={50}
          fluid
          src={process.env.PUBLIC_URL + "/logo-only.png"}
        />
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={handleToggleUnfoldable}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
