import React, { useState } from "react";
import {useHistory,useParams} from 'react-router-dom'
import {CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CLabel,CInputGroupAppend, CFormGroup,CInvalidFeedback, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector} from "react-redux";
import {resetPassword } from "../../../redux/actions/generalActions";
import CustomLoadingComp from "../CustomLoadingComp/CustomLoadingComp";
import Logo from '../../../assets/images/logo2.svg'


const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params=useParams();
    const [type, setType] = useState("password")
    const [confirmType, setConfirmType] = useState("password")
    let  mytoken  = params.token;


    const phoneRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordRegExp = RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,24}$/);

    const validationSchemaFormat = Yup.object().shape({
    newPassword: Yup
    .string()
    .label('Password')
    .required('Password Required')
    .min(8, 'Seems a bit short(Min 8 characters)...')
    .max(24, 'Please try a shorter password(Max 24 characters).')
    .matches(passwordRegExp, 'Password Must Have Letter and Number'),
    
    confirmPassword: Yup
        .string()
        .required()
        .label('Confirm password')
        .test('passwords-match', 'Passwords must match ', function(value) {
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
    let loading = useSelector((state)=>{
    return state.general.isLoading
    });    
 
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
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field type={type} name="newPassword" placeholder="New Password" className={`form-control ${touched.newPassword && errors.newPassword?"is-invalid": touched.newPassword && !errors.newPassword?"is-valid":null}`}/>
                            <CInputGroupAppend>
                                <CInputGroupText type="button" color="light" onClick={() => handleShowPassword()}>
                                    {type=== "password"?
                                        <img src={'../images/visibility_1.png'}  width="15px" className="img-fluid" alt="showpassword" />
                                    :
                                        <img src={'../images/visibility_2.png'} width="15px" className="img-fluid" alt="showpassword" />
                                    }
                                </CInputGroupText>
                            </CInputGroupAppend>
                            <CInvalidFeedback className="help-block">{errors.newPassword}</CInvalidFeedback>
                          </CInputGroup>
                        {/* <div className="error pink-txt f-11">{(touched.newPassword && errors.newPassword && errors.newPassword)}</div> */}
                        </CFormGroup>

                        <CFormGroup className="mt-3 mb-1">
                          <CLabel >Confirm Password</CLabel>
                          <CInputGroup >
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <Field type={confirmType} name="confirmPassword" placeholder="Confirm Password" className={`form-control ${touched.confirmPassword && errors.confirmPassword?"is-invalid": touched.confirmPassword && !errors.confirmPassword?"is-valid":null}`}/>
                            <CInputGroupAppend>
                                <CInputGroupText type="button" color="light" onClick={() => handleShowConfirmPassword()}>
                                    {confirmType=== "password"?
                                        <img src={'../images/visibility_1.png'}  width="15px" className="img-fluid" alt="showpassword" />
                                    :
                                        <img src={'../images/visibility_2.png'} width="15px" className="img-fluid" alt="showpassword" />
                                    }
                                </CInputGroupText>
                            </CInputGroupAppend>
                            <CInvalidFeedback className="help-block">{errors.confirmPassword}</CInvalidFeedback>
                          </CInputGroup>
                        {/* <div className="error pink-txt f-11">{(touched.confirmPassword && errors.confirmPassword && errors.confirmPassword)}</div> */}
                        </CFormGroup>

                        <CRow className="mt-4">
                          <CCol xs="6">
                            <CButton type="submit" className="px-4 pinkbg-btn">Change Password</CButton>
                          </CCol>
                        </CRow>
                        <React.Fragment>
                          {loading?
                            <CustomLoadingComp path="../"/>
                          :
                            null
                          }
                        </React.Fragment>
                      </Form>
                    )}
                  </Formik>
                  
                </CCardBody>

              </CCard>

              
              <CCard className="text-white bg-pickypigs py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center d-flex align-items-center">
                  <img src={Logo} className="img-fluid m-auto" width="150px" alt="Logo"/>
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
