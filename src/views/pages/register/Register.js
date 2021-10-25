import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
const Register = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const [formError, setFormError] = useState({});
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
      formError.contact === "" &&
      formError.password === ""
    ) {
      axios.post("register", data).then((res) => {
        localStorage.setItem("user.token", res.data.token);
        localStorage.setItem("user.role", res.data.data.role);
        props.history.push("/");
        console.log(res);
      });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
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
                  {formError.name && <div>{formError.name}</div>}
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
                  {formError.email && <div>{formError.email}</div>}
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
                  {formError.address && <div>{formError.address}</div>}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cilPhone" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Contact"
                      autoComplete="contact"
                      name="contact"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  {formError.contact && <div>{formError.contact}</div>}
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
                      {formError.password && <div>{formError.password}</div>}
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
                          autoComplete="new-password"
                          name="new-password"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
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
