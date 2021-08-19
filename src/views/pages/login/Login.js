import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInvalidFeedback,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  getLogin,
} from "../../../redux/actions/generalActions";
import CustomLoadingComp from "../CustomLoadingComp/CustomLoadingComp";
import Logo from "../../../assets/images/logo2.svg";

const passwordRegExp = RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,24}$/);

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [type, setType] = useState("password");
  const [isLoginPage, setLoginPage] = useState(true);

  const validationSchemaForLogin = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .label("Password")
      .required("Password Required")
      .min(8, "Seems a bit short(Min 8 characters)...")
      .max(24, "Please try a shorter password(Max 24 characters).")
      .matches(passwordRegExp, "Password Must Have Letter and Number"),
  });

  const validationSchemaForForgotPassword = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
  });

  const handleLoginForm = (input) => {
    let obj = {
      email: input.email,
      password: input.password,
    };
    dispatch(getLogin(obj, history));
  };

  const handlelForgotPassword = (input) => {
    let obj = {
      email: input.email,
    };
    dispatch(forgotPassword(obj));
  };

  const handlePassword = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  let loading = useSelector((state) => {
    return state.general.isLoading;
  });

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {isLoginPage ? (
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={validationSchemaForLogin}
                      onSubmit={(values) => {
                        handleLoginForm(values);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <Form>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <CInputGroup className="mb-1">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field
                              name="email"
                              placeholder="Email"
                              className={`form-control ${
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : touched.email && !errors.email
                                  ? "is-valid"
                                  : null
                              }`}
                              autoComplete="new-password"
                            />
                            <CInvalidFeedback className="help-block">
                              {errors.email}
                            </CInvalidFeedback>
                          </CInputGroup>

                          <CInputGroup className="mt-4 mb-1">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field
                              type={type}
                              name="password"
                              placeholder="Password"
                              className={`form-control ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : touched.password && !errors.password
                                  ? "is-valid"
                                  : null
                              }`}
                              autoComplete="new-password"
                            />
                            <CInputGroupAppend>
                              <CInputGroupText
                                type="button"
                                color="light"
                                onClick={() => handlePassword()}
                              >
                                {type === "password" ? (
                                  <img
                                    src={"images/visibility_1.png"}
                                    width="15px"
                                    className="img-fluid"
                                    alt="showpassword"
                                  />
                                ) : (
                                  <img
                                    src={"images/visibility_2.png"}
                                    width="15px"
                                    className="img-fluid"
                                    alt="showpassword"
                                  />
                                )}
                              </CInputGroupText>
                            </CInputGroupAppend>
                            <CInvalidFeedback className="help-block">
                              {errors.password}
                            </CInvalidFeedback>
                          </CInputGroup>
                          <CRow className="mt-4">
                            <CCol xs="6">
                              <CButton
                                type="submit"
                                className="px-4 pinkbg-btn"
                              >
                                Login
                              </CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton
                                onClick={() => {
                                  setLoginPage(false);
                                }}
                                color="link"
                                className="px-0 pink-txt trans_button"
                              >
                                Forgot password?
                              </CButton>
                            </CCol>
                          </CRow>
                          <React.Fragment>
                            {loading ? (
                              <section className="container">
                                <CustomLoadingComp />
                              </section>
                            ) : null}
                          </React.Fragment>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={validationSchemaForForgotPassword}
                      onSubmit={(values) => {
                        handlelForgotPassword(values);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                        <Form>
                          <h1>Forgot Password</h1>
                          <p className="text-muted">Enter Your Email Address</p>
                          <CInputGroup className="mb-1">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field
                              name="email"
                              placeholder="Email"
                              className={`form-control ${
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : touched.email && !errors.email
                                  ? "is-valid"
                                  : null
                              }`}
                            />
                            <CInvalidFeedback className="help-block">
                              {errors.email}
                            </CInvalidFeedback>
                          </CInputGroup>
                          {/* <div className="error pink-txt f-11">{(touched.email && errors.email && errors.email) || forgotPasswordData&& forgotPasswordData.message}</div> */}
                          <CRow className="mt-4">
                            <CCol xs="6">
                              <CButton
                                type="submit"
                                className="px-4 pinkbg-btn"
                              >
                                Reset Password
                              </CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton
                                onClick={() => {
                                  setLoginPage(true);
                                }}
                                color="link"
                                className="px-0 pink-txt trans_button"
                              >
                                Sign In ?
                              </CButton>
                            </CCol>
                          </CRow>
                          <React.Fragment>
                            {loading ? <CustomLoadingComp /> : null}
                          </React.Fragment>
                        </Form>
                      )}
                    </Formik>
                  )}
                </CCardBody>
              </CCard>

              <CCard
                className="text-white bg-pickypigs py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center d-flex align-items-center">
                  <img
                    src={Logo}
                    className="img-fluid m-auto"
                    width="150px"
                    alt="Logo"
                  />
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
