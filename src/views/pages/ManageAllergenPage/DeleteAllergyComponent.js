import React from "react";
import {useDispatch} from "react-redux";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle, } from '@coreui/react';
import { deleteSelectedAllergyData } from "../../../redux/actions/manageAllergyAction";



const DeleteAllergyComponent = (props) => {

  const dispatch=useDispatch();

    const handleDelete=()=>{
        dispatch(deleteSelectedAllergyData(props.selectedid,props.imagepath,props.perPage,props.myPage,props.inputValue));
        props.onClose();
    }
    return (
        <>
            <CModal 
              {...props}
              centered
              color="danger"
              size=""
            >
              <CModalHeader >
                <CModalTitle>Are you sure to delete this record? </CModalTitle>
              </CModalHeader>
             
              <CModalFooter className="d-flex justify-content-center">
                <CButton className="pl-4 pr-4 mr-4" color="secondary" onClick={props.onClose}>  No  </CButton>{' '}
                <CButton className="pl-4 pr-4" color="danger" onClick={handleDelete}>  Yes  </CButton>
              </CModalFooter>
            </CModal>

        </>
    )
}

export default DeleteAllergyComponent;