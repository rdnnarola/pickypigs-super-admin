import React from "react";
import {useDispatch} from "react-redux";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle, } from '@coreui/react'// import {deleteSelectedMenuData} from "../../redux/actions/menuAction"
import { deleteSelectedRestaurantData } from "../../../redux/actions/manageRestaurantAction";



const DeleteRestaurantModalComp = (props) => {

  const dispatch=useDispatch();

    const handleDelete=()=>{
        dispatch(deleteSelectedRestaurantData(props.selectedid,props.perpage,props.mypage,props.inputvalue));
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
                <CModalTitle>Are you sure to delete this Restaurant? </CModalTitle>
              </CModalHeader>
             
              <CModalFooter className="d-flex justify-content-center">
                <CButton className="pl-4 pr-4 mr-4" color="secondary" onClick={props.onClose}>  No  </CButton>{' '}
                <CButton className="pl-4 pr-4" color="danger" onClick={handleDelete}>  Yes  </CButton>
              </CModalFooter>
            </CModal>

        </>
    )
}

export default DeleteRestaurantModalComp;