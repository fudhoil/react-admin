import React, { useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CImage } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { getSubmitions } from "src/slices/submitions";
import { CButton } from "@coreui/react";
import { Row, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
// import Moment from "react-moment";

const Submitions = () => {
  const [data, setData] = React.useState([]);
  const { submitions, isLoading } = useSelector((state) => state.submitions);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "UGM International Forum - Admin | Submitions";
    dispatch(getSubmitions());
    setData(submitions);
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
          if (
            key === "bukti_transfer" ||
            key === "fullPaper" ||
            key === "student_id" ||
            key === "personal_photo"
          ) {
            result +=
              "https://gxoib8zz.directus.app/assets/" + item[key] + "?download";
          } else if (key === "date_created") {
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
        name: "QRCODE",
        cell: (row) => (
          <>
            <CButton
              size="sm"
              variant="outline"
              href={row.url_qrcode}
              target="_blank"
              style={{ marginRight: "100px" }}
            >
              <CImage src={row.url_qrcode} width={100} />
            </CButton>
          </>
        ),
      },
      {
        name: "Personal Photo",
        cell: (row) => (
          <>
            <CButton
              size="sm"
              variant="outline"
              href={
                "https://gxoib8zz.directus.app/assets/" + row.personal_photo
              }
              target="_blank"
            >
              <CImage
                src={
                  "https://gxoib8zz.directus.app/assets/" + row.personal_photo
                }
                width={100}
              />
            </CButton>
          </>
        ),
      },
      {
        name: "Title",
        selector: (row) => row.title,
      },
      {
        name: "Sub Theme",
        selector: (row) => row.subtheme,
      },
      {
        name: "Names",
        cell: (row) => (
          <>
            <Container>
              <Row>1. {row.fullName}</Row>
              <Row>2. {row.fullName2 || "-"}</Row>
              <Row>3. {row.fullName3 || "-"}</Row>
            </Container>
          </>
        ),
      },
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Institution",
        selector: (row) => row.institution,
      },
      {
        name: "Category",
        selector: (row) => row.subteam,
      },
      {
        name: "Student ID",
        button: true,
        cell: (row) => (
          <CButton
            size="sm"
            variant="outline"
            href={
              "https://gxoib8zz.directus.app/assets/" +
              row.student_id +
              "?download"
            }
            target="_blank"
          >
            Download
          </CButton>
        ),
      },
      {
        name: "Payment Proof",
        button: true,
        cell: (row) => (
          <CButton
            size="sm"
            variant="outline"
            href={
              "https://gxoib8zz.directus.app/assets/" +
              row.bukti_transfer +
              "?download"
            }
            target="_blank"
          >
            Download
          </CButton>
        ),
      },
      {
        name: "Fullpaper",
        cell: (row) => (
          <CButton
            size="sm"
            variant="outline"
            href={
              "https://gxoib8zz.directus.app/assets/" +
              row.fullPaper +
              "?download"
            }
            target="_blank"
          >
            Download
          </CButton>
        ),
      },
    ];
    //   const { submitions } = useSelector((state) => state.submitions);
    const actionsMemo = React.useMemo(
      () => <Export onExport={() => downloadCSV(props.submitions)} />,
      []
    );

    return (
      <DataTable
        title="Submitions Table"
        columns={columns}
        data={props.submitions}
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
            {submitions && <ExportCSV submitions={submitions} />}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Submitions;
