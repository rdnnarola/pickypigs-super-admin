import React, { useEffect } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  CFormGroup,
  CLabel,
  CInvalidFeedback,
  CCardFooter,
} from "@coreui/react";
import {
  getSelectedDietaryData,
  updateSelectedDietary,
} from "../../../redux/actions/manageDietaryAction";
import { SERVER_URL } from "../../../shared/constant";
import UploadImageComponent from "../../../reusable/UploadImageComponent";

// const packages = ["basic","standard","premium"];
// const roles=["restaurant_admin"]
// const passwordRegExp = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);

const UpdateDietaryComponent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.show) {
      dispatch(getSelectedDietaryData(props.selectedid));
    }
  }, [dispatch, props.show, props.selectedid]);

  let selectedDietaryData = useSelector((state) => {
    return state.dietary.selectedDietary;
  });
  const validationSchemaForm = Yup.object().shape({
    name: Yup.string().required("Dietary Name is required"),
    image: Yup.string().required("Dietary Image is required"),
    description:Yup.string().required('Dietary Description is required'),
  });

  const initialValues = {
    name: selectedDietaryData && selectedDietaryData.name,
    image: selectedDietaryData && selectedDietaryData.image,
    description:selectedDietaryData&&selectedDietaryData.description,
  };

  const onSubmit = (input, { setStatus, resetForm }) => {
    setStatus();
    let obj = {
      name: input.name,
      image: input.image,
      description:input.description,
    };
    dispatch(
      updateSelectedDietary(
        props.selectedid,
        obj,
        props.imagepath,
        props.perpage,
        props.mypage,
        props.inputvalue
      )
    );
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
            Update Dietary Data
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchemaForm}
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
                      <CLabel>Dietary Name</CLabel>
                      <Field
                        name="name"
                        defaultValue=""
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
                    {/* <CFormGroup >
                                            <CLabel >Dietary Description</CLabel>
                                            <Field component="textarea" style={{height:100}} name="description" placeholder="Enter here" className={`form-control ${touched.description && errors.description?"is-invalid": touched.description && !errors.description?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.description}</CInvalidFeedback>
                                        </CFormGroup>  */}
                     <CFormGroup>
                      <CLabel>Cuisine Description</CLabel>
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
                      <CLabel>Allergy Image</CLabel>
                      <UploadImageComponent
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
                          {typeof values.image === "string" ||
                          values.image instanceof String ? (
                            <img
                              src={`${SERVER_URL}/${values.image}`}
                              width="160px"
                              height="100px"
                              className="border"
                              alt={
                                values && values.name ? values.name : "image"
                              }
                            />
                          ) : (
                            <img
                              src={URL.createObjectURL(values.image)}
                              width="160px"
                              height="100px"
                              className="border"
                              alt={
                                values && values.name ? values.name : "image"
                              }
                            />
                          )}
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
                    <CButton color="success" type="submit">
                      Update
                    </CButton>
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

export default UpdateDietaryComponent;
