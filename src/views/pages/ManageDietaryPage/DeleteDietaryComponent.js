import React from "react";
import {useDispatch} from "react-redux";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle, } from '@coreui/react';
import { deleteSelectedDietaryData } from "../../../redux/actions/manageDietaryAction";



const DeleteDietaryComponent = (props) => {

  const dispatch=useDispatch();

    const handleDelete=()=>{
        dispatch(deleteSelectedDietaryData(props.selectedid,props.imagepath,props.perpage,props.mypage,props.inputvalue));
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
                <CModalTitle>Are you sure to delete this Dietary? </CModalTitle>
              </CModalHeader>
             
              <CModalFooter className="d-flex justify-content-center">
                <CButton className="pl-4 pr-4 mr-4" color="secondary" onClick={props.onClose}>  No  </CButton>{' '}
                <CButton className="pl-4 pr-4" color="danger" onClick={handleDelete}>  Yes  </CButton>
              </CModalFooter>
            </CModal>

        </>
    )
}

export default DeleteDietaryComponent;