import React, { useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import Tabs3 from "src/components/Tabs3";
// import { DocsExample } from "src/components";

const Buttons = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Home Section</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              CoreUI includes a bunch of predefined buttons components, each
              serving its own semantic purpose. Buttons show what action will
              happen when the user clicks or touches it. CoreUI buttons are used
              to initialize operations, both in the background or foreground of
              an experience.
            </p>
            <Tabs3
              tab1="Preview"
              tab2="Code"
              tab3="Live"
              pane1="Preview"
              pane2="Code"
              pane3="Live"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Buttons;
