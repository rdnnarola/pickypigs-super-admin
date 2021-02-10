import React,{useState,useEffect} from "react";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle,CModalBody,CInputGroupAppend,CInputGroupText,CInputGroup} from '@coreui/react';
import {useDispatch,useSelector} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CFormGroup,CLabel,CInvalidFeedback,CCardFooter} from '@coreui/react'
import { getSelectedAllergyData, updateSelectedAllergy } from "../../../redux/actions/manageAllergyAction";
import { useDropzone } from "react-dropzone";



const passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);

const UpdateAllergyComponent = (props) => {
    const dispatch=useDispatch();
    
    useEffect(()=>{
        if (props.show) {
            dispatch(getSelectedAllergyData(props.selectedid));
        }
    },[dispatch,props.show,props.selectedid]);

    let selectedAllergyData = useSelector((state)=>{
        return state.allergy.selectedAllergy
    });

    const initialValues = {
        name:selectedAllergyData&&selectedAllergyData.name,
        image:selectedAllergyData&&selectedAllergyData.image,
        description:selectedAllergyData&&selectedAllergyData.description,
       
    }
    const validationSchemaForm  = Yup.object().shape({
        name:Yup.string().required('Allergy Name is required'),
        image:Yup.string().required('Allergy Image is required'),
        description:Yup.string().required('Allergy Description is required'),
    });


    
    const onSubmit=(input, { setStatus,resetForm})=>{
        setStatus();
        let obj = {
            name: input.name,
            image:input.image,
            description:input.description,
        }
        dispatch(updateSelectedAllergy(props.selectedid,obj,props.imagepath,props.perPage,props.myPage,props.inputValue));
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
                        Update Allergy Data 
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Formik 
                        enableReinitialize={true} 
                        initialValues={initialValues} 
                        validationSchema={validationSchemaForm} 
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched,values, setSubmitting , isSubmitting, setFieldValue,handleChange }) => {
                            return (
                                <Form>
                                    <div >
                                    <CFormGroup >
                                            <CLabel >Allergy Name</CLabel>
                                            <Field name="name" placeholder="Enter here" className={`form-control ${touched.name && errors.name?"is-invalid": touched.name && !errors.name?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.name}</CInvalidFeedback>
                                        </CFormGroup> 
                                        <CFormGroup >
                                            <CLabel >Allergy Description</CLabel>
                                            <Field component="textarea" style={{height:100}} name="description" placeholder="Enter here" className={`form-control ${touched.description && errors.description?"is-invalid": touched.description && !errors.description?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.description}</CInvalidFeedback>
                                        </CFormGroup> 
                                        {/* <CFormGroup >
                                            <CLabel >Allergy Image</CLabel>
                                            <Field name="image" placeholder="Enter here" className={`form-control ${touched.image && errors.image?"is-invalid": touched.image && !errors.image?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.image}</CInvalidFeedback>
                                        </CFormGroup> */}
                                        <CFormGroup >
                                            <CLabel >Allergy Image</CLabel>
                                            <UploadComponent setFieldValue={setFieldValue} setSubmitting={setSubmitting} className={`form-control ${touched.image && errors.image?"is-invalid": touched.image && !errors.image?"is-valid":null}`}/>
                                            <small className="text-danger  mt-1">{(touched.image && errors.image && errors.image) }</small>
                                            {values.image &&
                                             <div className="d-flex justify-content-center align-items-center p-3">
                                               {typeof values.image === 'string' || values.image instanceof String ?
                                                    <img src={`${props.imagelink}${values.image}`} width="160px" height="100px" className="border" alt={values&&values.name?values.name:"image"}/>
                                                    :
                                                    <img src={URL.createObjectURL(values.image)} width="160px" height="100px" className="border" alt={values&&values.name?values.name:"image"}/>
                                            }
                                            </div>
                                              }
                                        </CFormGroup>
                                    </div>
                                    <CCardFooter className="d-flex justify-content-end">
                                        <CButton color="secondary" className="mr-4" type="reset" onClick={()=>{props.onClose();}}>CANCLE</CButton>
                                        <CButton color="success" type="submit" disabled={isSubmitting}>Update</CButton>
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

export default UpdateAllergyComponent;



const UploadComponent = props => {
    const dispatch=useDispatch();
    const { setFieldValue ,setSubmitting} = props;


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: "image/*",
      onDrop: acceptedFiles => {
          setFieldValue("image", acceptedFiles[0]);
      }
    });
    

    return (
      <div className="border bg-primary" type="button">
        {}
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="d-flex justify-content-center align-items-center p-2">
              <img src={'images/upload.svg'}  width="30px" className="img-fluid mr-4" alt="showpassword" />
              <p className="text-white m-0">Click to Upload Image</p>
            </div>
          )}
        </div>
      </div>
    );
  };