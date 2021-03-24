import React,{useState,useEffect} from "react";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle,CModalBody,CInputGroupAppend,CInputGroupText,CInputGroup} from '@coreui/react';
// import {deleteSelectedMenuData} from "../../redux/actions/menuAction"
import {useDispatch,useSelector} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { updateSelectedRestaurantPassword } from "../../../redux/actions/manageRestaurantAction";
import { CFormGroup,CLabel,CInvalidFeedback,CCardFooter} from '@coreui/react'


const packages = ["basic","standard","premium"];
const roles=["restaurant_admin"]

const passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);

const UpdatePasswordModalComp = (props) => {
    const dispatch=useDispatch();
    const [type, setType] = useState("password")
    const [confirmType, setConfirmType] = useState("password")

    const initialValues = {
        password:'',
        confirmpassword:'',
    }
    const validationSchemaForm  = Yup.object().shape({
        password:Yup
        .string()
        .label('Password')
        .required('Password Required')
        .min(8, 'Seems a bit short(Min 8 characters)...')
        .max(24, 'Please try a shorter password(Max 24 characters).')
        .matches(passwordRegExp, 'Password should Have 1 Uppercase,1 Lowercase,1 digit,1 special characte'), 

        confirmpassword:Yup
        .string()
        .required()
        .label('Confirm password')
        .test('passwords-match','Passwords must match', function(value) {
        return this.parent.password === value;
        }),

    });


    
    const onSubmit=(input, { setStatus,resetForm})=>{
        setStatus();
        let obj = {
            password: input.password,
        }
        dispatch(updateSelectedRestaurantPassword(props.selectedid,obj,props.perpage,props.mypage,props.inputvalue));
        props.onClose();
        resetForm();

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
        <>
            <CModal
                {...props}
                size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="mainmodal-wrapper"
            >
                <CModalHeader className="align-items-center">
                    <CModalTitle className="brandon-Medium" id="contained-modal-title-vcenter">
                        Update Restaurant Password 
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Formik 
                        enableReinitialize={true} 
                        initialValues={initialValues} 
                        validationSchema={validationSchemaForm} 
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched,values, isSubmitting, setFieldValue,handleChange }) => {
                            return (
                                <Form>
                                    <div >
                                        <CFormGroup >
                                            <CLabel >Password</CLabel>
                                            <CInputGroup>
                                                <Field type={type} name="password" placeholder="Enter here" className={`form-control ${touched.password && errors.password?"is-invalid": touched.password && !errors.password?"is-valid":null}`} />
                                                <CInputGroupAppend>
                                                    <CInputGroupText type="button" color="light" onClick={() => handleShowPassword()}>
                                                        {type=== "password"?
                                                            <img src={'images/visibility_1.png'}  width="15px" className="img-fluid" alt="showpassword" />
                                                        :
                                                            <img src={'images/visibility_2.png'} width="15px" className="img-fluid" alt="showpassword" />
                                                        }
                                                    </CInputGroupText>
                                                </CInputGroupAppend>
                                                <CInvalidFeedback className="help-block">{errors.password}</CInvalidFeedback>
                                            </CInputGroup>
                                        </CFormGroup>
                                        <CFormGroup >
                                            <CLabel >confirm Password</CLabel>
                                            <CInputGroup>
                                                <Field type={confirmType} name="confirmpassword" placeholder="Enter here" className={`form-control ${touched.confirmpassword && errors.confirmpassword?"is-invalid": touched.confirmpassword && !errors.confirmpassword?"is-valid":null}`} />
                                                <CInputGroupAppend>
                                                    <CInputGroupText type="button" color="light" onClick={() => handleShowConfirmPassword()}>
                                                        {confirmType=== "password"?
                                                            <img src={'images/visibility_1.png'}  width="15px" className="img-fluid" alt="showpassword" />
                                                        :
                                                            <img src={'images/visibility_2.png'} width="15px" className="img-fluid" alt="showpassword" />
                                                        }
                                                    </CInputGroupText>
                                                </CInputGroupAppend>
                                                <CInvalidFeedback className="help-block">{errors.confirmpassword}</CInvalidFeedback>
                                            </CInputGroup>
                                        </CFormGroup>
                                    </div>
                                    <CCardFooter className="d-flex justify-content-end">
                                        <CButton color="secondary" className="mr-4" type="reset" onClick={props.onClose}>CANCEL</CButton>
                                        <CButton color="success" type="submit">Update</CButton>
                                    </CCardFooter>
                                </Form>
                            );
                        }}
                    </Formik>
                                    
                     
                    

                </CModalBody>
              
            </CModal>

        </>
    )
}

export default UpdatePasswordModalComp;