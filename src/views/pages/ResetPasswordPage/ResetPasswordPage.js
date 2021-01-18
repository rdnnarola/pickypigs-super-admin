import React, { useState } from "react";
import {useHistory,useParams} from 'react-router-dom'
import {CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CLabel, CFormGroup,CInvalidFeedback, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector} from "react-redux";
import {resetPassword } from "../../../redux/actions/generalActions";


const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params=useParams();
    const [type, setType] = useState("password")
    const [confirmType, setConfirmType] = useState("password")
    let  mytoken  = params.token;


    const phoneRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const validationSchemaFormat = Yup.object().shape({
    newPassword: Yup
        .string()
        .label('Password')
        .required('Required')
        .min(8, 'Seems a bit short(atleast 8 characters)...')
        .max(24, 'We prefer insecure system, try a shorter password.')
        .matches(phoneRegExp, 'Password should Have 1 Uppercase,1 Lowercase,1 digit,1 special characte'),
    
    confirmPassword: Yup
        .string()
        .required()
        .label('Confirm password')
        .test('passwords-match', 'Passwords must match ya fool', function(value) {
        return this.parent.newPassword === value;
        }),
         
    });

  
    const handleSavePassword = (input) => {
        let obj = {
            token:mytoken,
            newPassword: input.newPassword,
            confirmPassword: input.confirmPassword
        }
        dispatch(resetPassword(obj, history))
    }

  

    const handleShowPassword = () => {
            if (type === "password") {
                setType("text")
            } else {
                setType("password")
            }
        }
    const handleShowConfirmPassword=()=>{
            if (confirmType === "password") {
                setConfirmType("text")
            } else {
                setConfirmType("password")
            }
        }
 
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
            
              <CCard className="p-4">
                <CCardBody>
                  
                  <Formik
                      initialValues={{ newPassword: '',confirmPassword:'' }} validationSchema={validationSchemaFormat}
                      onSubmit={(values) => { console.log('values => ', values);  handleSavePassword(values) }}
                    >
                    {({
                      values, errors, touched, handleChange, handleBlur, isSubmitting,
                      /* and other goodies */
                    }) => (
                      <Form>

                        <h1>RESET PASSWORD</h1>
                        <p className="text-muted">Enter New Password</p>
                        <CFormGroup className="mt-4 mb-1">
                          <CLabel >New Password</CLabel>
                          <CInputGroup >
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon onClick={() => handleShowPassword()} name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field type={type} name="newPassword" placeholder="New Password" className={`form-control ${touched.newPassword && errors.newPassword?"is-invalid": touched.newPassword && !errors.newPassword?"is-valid":null}`}/>
                            <CInvalidFeedback className="help-block">{errors.newPassword}</CInvalidFeedback>
                          </CInputGroup>
                        {/* <div className="error pink-txt f-11">{(touched.newPassword && errors.newPassword && errors.newPassword)}</div> */}
                        </CFormGroup>

                        <CFormGroup className="mt-3 mb-1">
                          <CLabel >Confirm Password</CLabel>
                          <CInputGroup >
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon onClick={() => handleShowConfirmPassword()} name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field type={confirmType} name="confirmPassword" placeholder="Confirm Password" className={`form-control ${touched.confirmPassword && errors.confirmPassword?"is-invalid": touched.confirmPassword && !errors.confirmPassword?"is-valid":null}`}/>
                            <CInvalidFeedback className="help-block">{errors.confirmPassword}</CInvalidFeedback>
                          </CInputGroup>
                        {/* <div className="error pink-txt f-11">{(touched.confirmPassword && errors.confirmPassword && errors.confirmPassword)}</div> */}
                        </CFormGroup>

                        <CRow className="mt-4">
                          <CCol xs="6">
                            <CButton color="primary" type="submit" className="px-4">Change Password</CButton>
                          </CCol>
                         
                        </CRow>

                      </Form>
                    )}
                  </Formik>
                  
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

export default ResetPasswordPage
