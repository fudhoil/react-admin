import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/slices/login";
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from "@coreui/react";
import { cilLockLocked } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../assets/images/avatars/8.jpg";
import getAvatar from "src/utils/getAvatar";
import { getCookie } from "src/services/cookies";
import { NavLink } from "react-router-dom";

const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    const res = await dispatch(logout());
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={getAvatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem>
          <CNavLink to="/" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Logout
          </CNavLink>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
