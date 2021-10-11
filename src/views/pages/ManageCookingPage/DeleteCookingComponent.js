import React from "react";
import {useDispatch} from "react-redux";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle, } from '@coreui/react';
import { deleteSelectedCookingData } from "../../../redux/actions/manageCookingAction";
import CustomLoadingComp from "../CustomLoadingComp/CustomLoadingComp";



const DeleteCookingComponent = (props) => {

  const dispatch=useDispatch();

    const handleDelete=()=>{
        dispatch(deleteSelectedCookingData(props.selectedid,props.imagepath,props.perPage,props.myPage,props.inputValue));
        // props.onClose();
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
                <CModalTitle>Are you sure to delete this Cooking Method? </CModalTitle>
              </CModalHeader>
             
              <CModalFooter className="d-flex justify-content-center">
                <CButton className="pl-4 pr-4 mr-4" color="secondary" onClick={props.onClose}>  No  </CButton>{' '}
                <CButton className="pl-4 pr-4" color="danger" onClick={handleDelete}>  Yes  </CButton>
                <React.Fragment>
                  {props.loading ? <CustomLoadingComp /> : null}
                </React.Fragment>
              </CModalFooter>
            </CModal>

        </>
    )
}

export default DeleteCookingComponent;