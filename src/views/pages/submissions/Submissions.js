import React, { useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Tabs3 } from "src/components";
import { useSelector, useDispatch } from "react-redux";
import { getSubmissions } from "src/slices/submissions";

const Submissions = () => {
  const { isLoading, submissions } = useSelector((state) => state.submissions);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "UGM Admin | Submissions";
  }, []);

  useEffect(() => {
    dispatch(getSubmissions());
  }, [dispatch]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardBody>
            <table className="table">
              <thead>
                <tr>
                  <th>title</th>
                  <th>name</th>
                  <th>institution</th>
                  <th>subteam</th>
                  <th>bukti pembayaran</th>
                  <th>fullpaper</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.judul}</td>
                    <td>{submission.nama}</td>
                    <td>{submission.institusi}</td>
                    <td>{submission.subteam}</td>
                    <td>{submission.bukti_pembayaran}</td>
                    <td>{submission.fullpaper}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Submissions;
