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
import { addCuisineData } from "../../../redux/actions/manageCuisineAction";

const AddCuisineComponent = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    // description:'',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" Name is required"),
    // description:Yup.string().required('Description is required'),
  });

  const onSubmit = (fields, { setStatus, resetForm }) => {
    setStatus();
    dispatch(
      addCuisineData(fields, props.perpage, props.mypage, props.inputvalue)
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
            Add Cuisine
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values, setFieldValue, handleChange }) => {
              return (
                <Form>
                  <div>
                    <CFormGroup>
                      <CLabel>Cuisine Name</CLabel>
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
                    {/* <CFormGroup >
                                            <CLabel >Cuisine Description</CLabel>
                                            <Field component="textarea" style={{height:100}} name="description" placeholder="Enter here" className={`form-control ${touched.description && errors.description?"is-invalid": touched.description && !errors.description?"is-valid":null}`} />
                                            <CInvalidFeedback className="help-block">{errors.description}</CInvalidFeedback>
                                        </CFormGroup>  */}
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
                      ADD
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

export default AddCuisineComponent;
