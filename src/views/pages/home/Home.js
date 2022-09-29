import React, { useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Tabs3 } from "src/components";

const Home = () => {
  useEffect(() => {
    document.title = "UGM Admin | Home";
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
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

export default Home;
