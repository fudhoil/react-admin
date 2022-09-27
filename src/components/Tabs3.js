import React, { useState } from "react";
import PropTypes from "prop-types";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";

const Tabs3 = (props) => {
  const { tab1, tab2, tab3, pane1, pane2, pane3 } = props;
  const [activeKey, setActiveKey] = useState(1);
  return (
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            {tab1}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            {tab2}
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="javascript:void(0);"
            active={activeKey === 3}
            onClick={() => setActiveKey(3)}
          >
            {tab3}
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane
          role="tabpanel"
          aria-labelledby="home-tab"
          visible={activeKey === 1}
        >
          {pane1}
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="profile-tab"
          visible={activeKey === 2}
        >
          {pane2}
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="contact-tab"
          visible={activeKey === 3}
        >
          {pane3}
        </CTabPane>
      </CTabContent>
    </>
  );
};

Tabs3.propTypes = {
  tab1: PropTypes.string,
};

export default Tabs3;
