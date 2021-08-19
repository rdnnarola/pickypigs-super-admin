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
  getSelectedCuisineData,
  updateSelectedCuisine,
} from "../../../redux/actions/manageCuisineAction";

const UpdateCuisineComponent = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.show) {
      dispatch(getSelectedCuisineData(props.selectedid));
    }
  }, [dispatch, props.show, props.selectedid]);

  let selectedCuisineData = useSelector((state) => {
    return state.cuisine.selectedCuisine;
  });

  const initialValues = {
    name: selectedCuisineData && selectedCuisineData.name,
    // description:selectedCuisineData&&selectedCuisineData.description,
  };
  const validationSchemaForm = Yup.object().shape({
    name: Yup.string().required("Cuisine Name is required"),
    // description:Yup.string().required('Cuisine Description is required'),
  });

  const onSubmit = (input, { setStatus, resetForm }) => {
    setStatus();
    let obj = {
      name: input.name,
      // description:input.description,
    };
    dispatch(
      updateSelectedCuisine(
        props.selectedid,
        obj,
        props.perpage,
        props.mypage,
        props.inputvalue
      )
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
            Update Cuisine Data
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchemaForm}
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

export default UpdateCuisineComponent;
