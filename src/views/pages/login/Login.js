import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import {CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector} from "react-redux";
import { forgotPassword, getLogin } from "../../../redux/actions/generalActions";


const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [type, setType] = useState("password")
  const [isLoginPage, setLoginPage] = useState(true)

  const validationSchemaForLogin = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup
        .string()
        .label('Password')
        .required('Required')
        .min(4, 'Seems a bit short...')
        .max(15, 'We prefer insecure system, try a shorter password.')
  }); 

  const validationSchemaForForgotPassword = Yup.object().shape({
    email: Yup.string().email().required('Required'),        
  });

  const handleLoginForm = (input) => {
    let obj = {
        email: input.email,
        password: input.password
    }
    dispatch(getLogin(obj, history))
  }

  const handlelForgotPassword=(input)=>{
    let obj = {
        email: input.email,
    }
    dispatch(forgotPassword(obj))
  } 

  const handlePassword = () => {
    if (type === "password") {
        setType("text")
    } else {
        setType("password")
    }
  }
  let forgotPasswordData = useSelector((state)=>{
    return state.general.forgot_Password
  });
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
            
              <CCard className="p-4">
                <CCardBody>
                  {isLoginPage
                  ?
                  <Formik
                      initialValues={{ email: '', password: '' }} validationSchema={validationSchemaForLogin}
                      onSubmit={(values) => { console.log('values => ', values);  handleLoginForm(values) }}
                    >
                    {({
                      values, errors, touched, handleChange, handleBlur, isSubmitting,
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
                          <Field name="email" placeholder="Email" className="form-control" />
                        </CInputGroup>
                        {touched.email && errors.email && <span className="error pink-txt f-11 ">{errors.email}</span>}       

                        <CInputGroup className="mt-4 mb-1">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon onClick={() => handlePassword()} name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <Field type={type} name="password" placeholder="Password" className="form-control signup-input"/>
                        </CInputGroup>
                        <div className="error pink-txt f-11">{(touched.password && errors.password && errors.password)}</div>
                        <CRow className="mt-4">
                          <CCol xs="6">
                            <CButton color="primary" type="submit" className="px-4">Login</CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton onClick={() =>{setLoginPage(false)}} color="link" className="px-0">Forgot password?</CButton>
                          </CCol>
                        </CRow>

                      </Form>
                    )}
                  </Formik>
                  :
                  <React.Fragment>
                  <Formik
                      initialValues={{ email: '' }} validationSchema={validationSchemaForForgotPassword}
                      onSubmit={(values) => { console.log('values => ', values);  handlelForgotPassword(values) }}
                    >
                    {({
                      values, errors, touched, handleChange, handleBlur, isSubmitting,
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
                          <Field name="email" placeholder="Email" className="form-control" />
                        </CInputGroup>
                        <div className="error pink-txt f-11">{(touched.email && errors.email && errors.email) || forgotPasswordData&& forgotPasswordData.message}</div>
                        <CRow className="mt-4">
                          <CCol xs="6">
                            <CButton color="primary" type="submit" className="px-4">RESET PASSWORD</CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <CButton onClick={() =>{setLoginPage(true)}} color="link" className="px-0">Sign In ?</CButton>
                          </CCol>
                        </CRow>

                      </Form>
                    )}
                  </Formik>
                  </React.Fragment>
                  }
                </CCardBody>

              </CCard>

              
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center d-flex align-items-center">
                  <div >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
