import React, { useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { getSubmissions } from "src/slices/submissions";
import { CButton, CLink } from "@coreui/react";
import DataTable from "react-data-table-component";

const Submissions = () => {
  const [data, setData] = React.useState([]);
  const { submissions } = useSelector((state) => state.submissions);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "UGM Admin | Submissions";
    dispatch(getSubmissions());
    setData(submissions);
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
          if (key === "bukti_pembayaran" || key === "fullpaper") {
            result +=
              "https://gxoib8zz.directus.app/assets/" + item[key] + "?download";
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
      <CButton onClick={(e) => onExport(e.target.value)}>Export</CButton>
    );

    const columns = [
      {
        name: "Title",
        selector: (row) => row.judul,
      },
      {
        name: "Name",
        selector: (row) => row.nama,
      },
      {
        name: "Institution",
        selector: (row) => row.institusi,
      },
      {
        name: "Subteam",
        selector: (row) => row.subteam,
      },
      {
        name: "Bukti Pembayaran",
        button: true,
        cell: (row) => (
          <CButton
            size="sm"
            href={
              "https://gxoib8zz.directus.app/assets/" +
              row.bukti_pembayaran +
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
            href={
              "https://gxoib8zz.directus.app/assets/" +
              row.fullpaper +
              "?download"
            }
            target="_blank"
          >
            Download
          </CButton>
        ),
      },
    ];
    //   const { submissions } = useSelector((state) => state.submissions);
    const actionsMemo = React.useMemo(
      () => <Export onExport={() => downloadCSV(props.submissions)} />,
      []
    );

    return (
      <DataTable
        title="Submissions Table"
        columns={columns}
        data={props.submissions}
        actions={actionsMemo}
      />
    );
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>
            {submissions && <ExportCSV submissions={submissions} />}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Submissions;
