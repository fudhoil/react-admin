import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useSelector, useDispatch } from "react-redux";
import { login } from "src/slices/login";
import { getCookie } from "src/services/cookies";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [{ validated, message }, setValidated] = useState({
    validated: false,
    message: "",
  });

  // const [showPost, setShowPost] = useState(false);

  const { error, isLoading } = useSelector((state) => ({
    ...state.login,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(login({ values }));
    // const res = await dispatch(logout());
    if (response.errors) {
      setValidated(true, response.errors[0].message);
    }
    setValues({ email: email, password: password });
    // setShowPost(true);
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        type="email"
                        feedbackValid="Looks good!"
                        value={values.email}
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        feedbackValid="Looks good!"
                        value={values.password}
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        required
                      />
                    </CInputGroup>
                    <CFormFeedback
                      invalid={validated}
                      className="text-danger mb-4 mt-2"
                    >
                      {error === "Invalid user credentials."
                        ? "Wrong email or password"
                        : error}
                    </CFormFeedback>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          <CSpinner
                            component="span"
                            size="sm"
                            aria-hidden="true"
                            hidden={!isLoading}
                            className="mr-2"
                          />
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
