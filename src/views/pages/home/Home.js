import React, { useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Tabs3 } from "src/components";

const Home = () => {
  useEffect(() => {
    document.title = "UGM International Forum - Admin | Home";
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
              Welcome to UGM International Forum Admin. This is a simple
              dashboard for you to get
            </p>
            {/* <Tabs3
              tab1="Preview"
              tab2="Code"
              tab3="Live"
              pane1="Preview"
              pane2="Code"
              pane3="Live"
            /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Home;
