import React from "react";
import {
  CButton,
  CModal,
  CFormGroup,
  CLabel,
  CInvalidFeedback,
  CCardFooter,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { addFeaturesData } from "../../../redux/actions/manageFeaturesAction";
import { useDropzone } from "react-dropzone";
import CustomLoadingComp from "../CustomLoadingComp/CustomLoadingComp";
const AddFeaturesComponent = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    image: null,
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required"),
    image: Yup.mixed().required("Please Upload Image"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = (fields, { setStatus, resetForm }) => {
    setStatus();
    dispatch(
      addFeaturesData(fields, props.perpage, props.mypage, props.inputvalue)
    );
    // props.onClose();
    resetForm();
  };

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
          <CModalTitle
            className="brandon-Medium"
            id="contained-modal-title-vcenter"
          >
            Add Features
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              errors,
              touched,
              values,
              setSubmitting,
              isSubmitting,
              setFieldValue,
              handleChange,
            }) => {
              return (
                <Form>
                  <div>
                    <CFormGroup>
                      <CLabel>Features Name</CLabel>
                      <Field
                        name="name"
                        placeholder="Enter here"
                        className={`form-control ${
                          touched.name && errors.name
                            ? "is-invalid"
                            : touched.name && !errors.name
                            ? "is-valid"
                            : null
                        }`}
                      />
                      <CInvalidFeedback className="help-block">
                        {errors.name}
                      </CInvalidFeedback>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Features Description</CLabel>
                      <Field
                        component="textarea"
                        style={{ height: 100 }}
                        name="description"
                        placeholder="Enter here"
                        className={`form-control ${
                          touched.description && errors.description
                            ? "is-invalid"
                            : touched.description && !errors.description
                            ? "is-valid"
                            : null
                        }`}
                      />
                      <CInvalidFeedback className="help-block">
                        {errors.description}
                      </CInvalidFeedback>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Features Image</CLabel>
                      <UploadComponent
                        setFieldValue={setFieldValue}
                        setSubmitting={setSubmitting}
                        className={`form-control ${
                          touched.image && errors.image
                            ? "is-invalid"
                            : touched.image && !errors.image
                            ? "is-valid"
                            : null
                        }`}
                      />
                      <small className="text-danger  mt-1">
                        {touched.image && errors.image && errors.image}
                      </small>
                      {values.image && (
                        <div className="d-flex justify-content-center align-items-center p-3">
                          <img
                            src={URL.createObjectURL(values.image)}
                            width="160px"
                            height="100px"
                            className="border"
                            alt={values && values.name ? values.name : "image"}
                          />
                        </div>
                      )}
                    </CFormGroup>
                  </div>
                  <CCardFooter className="d-flex justify-content-end">
                    <CButton
                      color="secondary"
                      className="mr-4"
                      type="reset"
                      onClick={() => {
                        props.onClose();
                      }}
                    >
                      CANCEL
                    </CButton>
                    <CButton
                      color="success"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      ADD
                    </CButton>
                    <React.Fragment>
                      {props.loading ? <CustomLoadingComp /> : null}
                    </React.Fragment>
                  </CCardFooter>
                </Form>
              );
            }}
          </Formik>
        </CModalBody>
      </CModal>
    </>
  );
};

export default AddFeaturesComponent;

const UploadComponent = (props) => {
  const { setFieldValue } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue("image", acceptedFiles[0]);
    },
  });

  return (
    <div className="border bg-primary" type="button">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="d-flex justify-content-center align-items-center p-2">
            <img
              src={"images/upload.svg"}
              width="30px"
              className="img-fluid mr-4"
              alt="showpassword"
            />
            <p className="text-white m-0">Click to Upload Image</p>
          </div>
        )}
      </div>
    </div>
  );
};
