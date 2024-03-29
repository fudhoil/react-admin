import React, { useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { getRegisters } from "src/slices/registers";
import { CButton } from "@coreui/react";
import DataTable from "react-data-table-component";
// import Moment from "react-moment";
import { CImage } from "@coreui/react";

const Submitions = () => {
  const [data, setData] = React.useState([]);
  const { registers, isLoading } = useSelector((state) => state.registers);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "UGM International Forum - Admin | Registers";
    dispatch(getRegisters());
    setData(registers);
  }, [dispatch]);

  const ExportCSV = (props) => {
    const convertArrayOfObjectsToCSV = (array) => {
      let result;

      const columnDelimiter = ",";
      const lineDelimiter = "\n";
      const keys = Object.keys(array[0]);

      result = "";
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      array.forEach((item) => {
        let ctr = 0;
        keys.forEach((key) => {
          if (ctr > 0) result += columnDelimiter;
          if (key === "date_created") {
            const date = new Date(item[key]);
            let day = date.toLocaleDateString("en-us", { day: "numeric" });
            let month = date.toLocaleDateString("en-us", { month: "short" });
            let year = date.toLocaleDateString("en-us", { year: "numeric" });
            const FormattedDate = `${day} ${month} ${year}`;
            return (result += FormattedDate);
          } else {
            result += item[key];
          }

          ctr++;
        });
        result += lineDelimiter;
      });

      return result;
    };

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    const downloadCSV = (array) => {
      const link = document.createElement("a");
      let csv = convertArrayOfObjectsToCSV(array);
      if (csv == null) return;

      const filename = "export.csv";

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      link.setAttribute("href", encodeURI(csv));
      link.setAttribute("download", filename);
      link.click();
    };

    const Export = ({ onExport }) => (
      <CButton size="sm" onClick={(e) => onExport(e.target.value)}>
        Export CSV
      </CButton>
    );

    const columns = [
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "First Name",
        selector: (row) => row.firstName,
      },
      {
        name: "Last Name",
        selector: (row) => row.lastName,
      },
      {
        name: "Institution",
        selector: (row) => row.institution,
      },
      {
        name: "No Handphone",
        selector: (row) => row.phone,
      },
      {
        name: "Day Choosed",
        cell: (row) => row.choose_day,
      },
    ];
    //   const { registers } = useSelector((state) => state.registers);
    const actionsMemo = React.useMemo(
      () => <Export onExport={() => downloadCSV(props.registers)} />,
      []
    );

    return (
      <DataTable
        title="Registers Table"
        columns={columns}
        data={props.registers}
        actions={actionsMemo}
        progressPending={isLoading}
        pagination
      />
    );
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>
            {registers && <ExportCSV registers={registers} />}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Submitions;
