import React,{useState,useEffect} from "react";
import {CButton,CModal,CFormGroup,CLabel,CInvalidFeedback,CCardFooter,
    CModalHeader,CModalTitle,CModalBody} from '@coreui/react'
import {useDispatch,useSelector} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addLifestyleData } from "../../../redux/actions/manageLifestyleAction";

const phoneRegex = RegExp( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,24})/);

const AddLifestyleComponent = (props) => {
    const dispatch=useDispatch();

   
    const initialValues = {
        name:'',
        // description:'',
       
    }

    const validationSchema  = Yup.object().shape({
        name:Yup.string().required(' Name is required'),
        // description:Yup.string().required('Description is required'),
    });

    
    const onSubmit=(fields, { setStatus,resetForm})=>{
        setStatus();
        dispatch(addLifestyleData(fields));
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
                        Add  Lifestyle || 
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                        {({ errors, touched,values, setFieldValue,handleChange }) => {
                            return (
                                <Form>
                                    <div >
                                        <CFormGroup >
                                            <CLabel >Lifestyle Name</CLabel>
                                            <Field name="name" placeholder="Enter here" className={`form-control ${touched.name && errors.name?"is-invalid": touched.name && !errors.name?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.name}</CInvalidFeedback>
                                        </CFormGroup> 
                                        {/* <CFormGroup >
                                            <CLabel >Lifestyle Description</CLabel>
                                            <Field component="textarea" style={{height:100}} name="description" placeholder="Enter here" className={`form-control ${touched.description && errors.description?"is-invalid": touched.description && !errors.description?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.description}</CInvalidFeedback>
                                        </CFormGroup>  */}
                                    </div>

                                    <CCardFooter className="d-flex justify-content-end">
                                        <CButton color="secondary" className="mr-4" type="reset" onClick={()=>{props.onClose();}}>CANCLE</CButton>
                                        <CButton color="success" type="submit" >ADD</CButton>
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

export default AddLifestyleComponent;


