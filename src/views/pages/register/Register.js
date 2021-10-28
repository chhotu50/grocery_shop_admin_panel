import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./register.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import FormValidation from "src/helper/FormValidation";
import axios from "axios";
import { Redirect } from "react-router-dom";
const Register = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const [formError, setFormError] = useState({});
  const [error, setError] = useState(true);
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setFormError({
      ...formError,
      [e.target.name]: FormValidation.registerForm(e.target.name, e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formError.name === "" &&
      formError.email === "" &&
      formError.address === "" &&
      formError.phone === "" &&
      formError.password === ""
    ) {
      if (data.password === data.confirm_password) {
        setError(true);
        axios.post("register", data).then((res) => {
          if (res.data.status === "true") {
            localStorage.setItem("user.token", res.data.token);
            localStorage.setItem("user.role", res.data.user.role);
            props.history.push("/");
            window.location.reload();
            console.log(res);
          } else {
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log(res);
          }
        });
      } else {
        setError(false);
      }
    }
  };
  if (localStorage.getItem("user.token")) {
    return <Redirect to="/" />;
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <ToastContainer />
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="name"
                      autoComplete="name"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  {formError.name && <div className="validation">{formError.name}</div>}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  {formError.email && <div className="validation">{formError.email}</div>}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cilHome" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Address"
                      autoComplete="address"
                      name="address"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  {formError.address && <div className="validation">{formError.address}</div>}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cilPhone" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="phone"
                      autoComplete="phone"
                      name="phone"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  {formError.phone && <div className="validation">{formError.phone}</div>}
                  <CRow>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          name="password"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      {formError.password && <div className="validation">{formError.password}</div>}
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="confirm_password"
                          name="confirm_password"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      {!error ? <div className="validation">Password does not match</div> : ""}
                    </CCol>
                  </CRow>
                  <CButton color="success" block type="submit">
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
