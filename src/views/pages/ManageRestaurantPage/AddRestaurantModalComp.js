import React,{useState,useEffect} from "react";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle,CModalBody } from '@coreui/react'// import {deleteSelectedMenuData} from "../../redux/actions/menuAction"
import {useDispatch,useSelector} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment'
import { addRestaurantData } from "../../../redux/actions/manageRestaurantAction";
import { CFormGroup,CLabel,CRow,CCol,CForm,CInvalidFeedback,CCardFooter} from '@coreui/react'


const packages = ["basic","standard","premiun"];
const roles=["restaurant_admin"]

const AddRestaurantModalComp = (props) => {
    const dispatch=useDispatch();
 

    const initialValues = {
        name:'',
        contactName:'',
        company:'',
        phoneNumber:'',
        email:'',
        password:'',
        package:'',
        role:'',
        isAgreeToTerms:false
    }

    const validationSchema  = Yup.object().shape({
        name:Yup.string().required('Title is required'),
        contactName:Yup.string().required('Title is required'),
        company:Yup.string().required('Title is required'),
        phoneNumber:Yup.number().required().positive().integer(),
        email:Yup.string().email().required('Title is required'),
        password:Yup.string().required('Title is required'),
        package:Yup.string().required('Title is required'),
        role:Yup.string().required('Title is required'),
        isAgreeToTerms:Yup.boolean().oneOf([true], "You must accept the terms and conditions").required()
    });


   

   

    const onSubmit=(fields, { setStatus,resetForm})=>{
        setStatus();
        dispatch(addRestaurantData(fields));
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
                        Add  Restaurant
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                        {({ errors, touched,values, isSubmitting, setFieldValue,handleChange }) => {
                            return (
                                <Form>
                                    <div >
                                        <CFormGroup >
                                            <CLabel >Restaurant Name</CLabel>
                                            <Field name="name" placeholder="Enter here" className={`form-control ${touched.name && errors.name?"is-invalid": touched.name && !errors.name?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.name}</CInvalidFeedback>
                                        </CFormGroup> 
                                        <CFormGroup >
                                            <CLabel >Contact Name</CLabel>
                                            <Field name="contactName" placeholder="Enter here" className={`form-control ${touched.contactName && errors.contactName?"is-invalid": touched.contactName && !errors.contactName?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.contactName}</CInvalidFeedback>
                                        </CFormGroup> 
                                        <CFormGroup >
                                            <CLabel >Company Name</CLabel>
                                            <Field name="company" placeholder="Enter here" className={`form-control ${touched.company && errors.company?"is-invalid": touched.company && !errors.company?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.company}</CInvalidFeedback>
                                        </CFormGroup> 
                                        
                                        <CRow>
                                            <CCol xs="6">
                                                <CFormGroup >
                                                    <CLabel >Email</CLabel>
                                                    <Field type="email" name="email" placeholder="Enter here" className={`form-control ${touched.email && errors.email?"is-invalid": touched.email && !errors.email?"is-valid":null}`} />
                                                    <CInvalidFeedback className="help-block">{errors.email}</CInvalidFeedback>
                                                </CFormGroup> 
                                            </CCol>
                                            <CCol>
                                                <CFormGroup >
                                                    <CLabel >Password</CLabel>
                                                    <Field type="password" name="password" placeholder="Enter here" className={`form-control ${touched.password && errors.password?"is-invalid": touched.password && !errors.password?"is-valid":null}`} />
                                                    <CInvalidFeedback className="help-block">{errors.password}</CInvalidFeedback>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                        <CFormGroup >
                                            <CLabel >Phone Number</CLabel>
                                            <Field name="phoneNumber" placeholder="Enter here" className={`form-control ${touched.phoneNumber && errors.phoneNumber?"is-invalid": touched.phoneNumber && !errors.phoneNumber?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.phoneNumber}</CInvalidFeedback>
                                        </CFormGroup> 
                                    
                                        <CRow>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel>Packages</CLabel>
                                                    <Field as="select" name="package" className={`text-capitalize form-control ${touched.package && errors.package?"is-invalid": touched.package && !errors.package?"is-valid":null}`}>
                                                        <option value="">Select</option>
                                                        {packages && packages.map((data, index)=>{
                                                            return(
                                                                <React.Fragment key={index}>
                                                                    <option className="text-capitalize" value={data}>{data}</option>
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                    </Field>
                                                    <CInvalidFeedback className="help-block">{errors.package}</CInvalidFeedback>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol xs="6">
                                                <CFormGroup>
                                                    <CLabel>Role</CLabel>
                                                    <Field as="select" name="role" className={`text-capitalize form-control ${touched.role && errors.role?"is-invalid": touched.role && !errors.role?"is-valid":null}`}>
                                                        <option value="">Select</option>
                                                        {roles && roles.map((data, index)=>{
                                                            return(
                                                                <React.Fragment key={index}>
                                                                    <option className="text-capitalize" value={data}>{data}</option>
                                                                </React.Fragment>
                                                            )
                                                        })}
                                                    </Field>
                                                    <CInvalidFeedback className="help-block">{errors.role}</CInvalidFeedback>
                                                </CFormGroup>
                                            </CCol>   
                                        </CRow>
                                        
                                        <CFormGroup>
                                            <Field type="checkbox" name="isAgreeToTerms"  className={`pb-4 mr-2 ${ errors.isAgreeToTerms?"is-invalid": !errors.isAgreeToTerms?"is-valid":null}`}/>
                                            <CLabel variant="checkbox" className="form-check-label" >I accept the terms of use</CLabel>
                                            <CInvalidFeedback className="help-block">{errors.isAgreeToTerms}</CInvalidFeedback>
                                        </CFormGroup>
                                    </div>
                                    <CCardFooter className="d-flex justify-content-end">
                                        <CButton color="secondary" className="mr-4" type="reset" onClick={props.onClose}>CANCLE</CButton>
                                        <CButton color="success" type="submit">ADD</CButton>
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

export default AddRestaurantModalComp;