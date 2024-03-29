import React from "react";
import { CFooter, CLink } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">
          &copy; 2022{" "}
          <CLink href="https://github.com/fudhoil" target="_blank">
            fudhoil
          </CLink>
        </span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        CoreUI React
      </div> */}
    </CFooter>
  );
};

export default React.memo(AppFooter);
