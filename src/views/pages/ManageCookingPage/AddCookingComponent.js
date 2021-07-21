import React,{useState,useEffect} from "react";
import {CButton,CModal,CFormGroup,CLabel,CInvalidFeedback,CCardFooter,
    CModalHeader,CModalTitle,CModalBody } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import {useDispatch,useSelector} from "react-redux";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addCookingData } from "../../../redux/actions/manageCookingAction";
import { useDropzone } from "react-dropzone";

// const phoneRegex = RegExp( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
// const passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,24})/);

const AddCookingComponent = (props) => {
    const dispatch=useDispatch();
    const [imageloading,setImageloading]=useState(false);

    
    const initialValues = {
        name:'',
        image:null,
        // description:'',
       
    }

    const validationSchema  = Yup.object().shape({
        name:Yup.string().required(' Name is required'),
        image:Yup.mixed().required('Please Upload Image'),
        // description:Yup.string().required('Description is required'),
    });

    
    const onSubmit=(fields, { setStatus,resetForm})=>{
        setStatus();
        dispatch(addCookingData(fields,props.perpage,props.mypage,props.inputvalue));
        // props.onClose();
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
                        Add  Cooking
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                        {({ errors, touched,values,setSubmitting , isSubmitting, setFieldValue,handleChange }) => {
                            return (
                                <Form>
                                    <div >
                                        <CFormGroup >
                                            <CLabel >Cooking Name</CLabel>
                                            <Field name="name" placeholder="Enter here" className={`form-control ${touched.name && errors.name?"is-invalid": touched.name && !errors.name?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.name}</CInvalidFeedback>
                                        </CFormGroup> 
                                        {/* <CFormGroup >
                                            <CLabel >Cooking Description</CLabel>
                                            <Field component="textarea" style={{height:100}} name="description" placeholder="Enter here" className={`form-control ${touched.description && errors.description?"is-invalid": touched.description && !errors.description?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.description}</CInvalidFeedback>
                                        </CFormGroup>  */}
                                        <CFormGroup >
                                            <CLabel >Cooking Image</CLabel>
                                            <UploadComponent setFieldValue={setFieldValue} setSubmitting={setSubmitting} className={`form-control ${touched.image && errors.image?"is-invalid": touched.image && !errors.image?"is-valid":null}`}/>
                                            <small className="text-danger  mt-1">{(touched.image && errors.image && errors.image) }</small>
                                            {values.image &&
                                             <div className="d-flex justify-content-center align-items-center p-3">
                                                    <img src={URL.createObjectURL(values.image)} width="160px" height="100px" className="border" alt={values&&values.name?values.name:"image"}/>
                                            </div>
                                              }
                                        </CFormGroup> 

                                    </div>
                                    <CCardFooter className="d-flex justify-content-end">
                                        <CButton color="secondary" className="mr-4" type="reset" onClick={()=>{props.onClose()}}>CANCEL</CButton>
                                        <CButton color="success" type="submit" disabled={isSubmitting}>ADD</CButton>
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

export default AddCookingComponent;


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