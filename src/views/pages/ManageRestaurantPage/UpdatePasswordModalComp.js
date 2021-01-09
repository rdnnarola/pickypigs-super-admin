import React,{useState,useEffect} from "react";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle,CModalBody } from '@coreui/react'// import {deleteSelectedMenuData} from "../../redux/actions/menuAction"
import {useDispatch,useSelector} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { updateSelectedRestaurantPassword } from "../../../redux/actions/manageRestaurantAction";
import { CFormGroup,CLabel,CInvalidFeedback,CCardFooter} from '@coreui/react'


const packages = ["basic","standard","premiun"];
const roles=["restaurant_admin"]

const UpdatePasswordModalComp = (props) => {
    const dispatch=useDispatch();
    const initialValues = {
        password:'',
        confirmpassword:'',
    }
    const validationSchemaForm  = Yup.object().shape({
        password:Yup.string()
        .label('Password')
        .required('Required')
        .min(8, 'Seems a bit short(atleast 8 characters)...')
        .max(16, 'We prefer insecure system, try a shorter password.'),

        confirmpassword:Yup.string()
        .required()
        .label('Confirm password')
        .test('passwords-match','Passwords must match ya fool', function(value) {
        return this.parent.password === value;
        }),

    });


    
    const onSubmit=(input, { setStatus,resetForm})=>{
        setStatus();
        let obj = {
            password: input.password,
        }
        dispatch(updateSelectedRestaurantPassword(props.selectedid,obj));
        props.onClose();
        resetForm();

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
                                            <Field type="password" name="password" placeholder="Enter here" className={`form-control ${touched.password && errors.password?"is-invalid": touched.password && !errors.password?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.password}</CInvalidFeedback>
                                        </CFormGroup>
                                        <CFormGroup >
                                            <CLabel >confirm Password</CLabel>
                                            <Field type="password" name="confirmpassword" placeholder="Enter here" className={`form-control ${touched.confirmpassword && errors.confirmpassword?"is-invalid": touched.confirmpassword && !errors.confirmpassword?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.confirmpassword}</CInvalidFeedback>
                                        </CFormGroup>
                                    </div>
                                    <CCardFooter className="d-flex justify-content-end">
                                        <CButton color="secondary" className="mr-4" type="reset" onClick={props.onClose}>CANCLE</CButton>
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