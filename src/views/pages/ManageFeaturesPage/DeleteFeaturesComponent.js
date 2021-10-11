import React from "react";
import {useDispatch} from "react-redux";
import {CButton,CModal,CModalFooter,CModalHeader,CModalTitle, } from '@coreui/react';
import { deleteSelectedFeaturesData } from "../../../redux/actions/manageFeaturesAction";
import CustomLoadingComp from "../CustomLoadingComp/CustomLoadingComp";



const DeleteFeaturesComponent = (props) => {

  const dispatch=useDispatch();

    const handleDelete=()=>{
        dispatch(deleteSelectedFeaturesData(props.selectedid,props.imagepath,props.perpage,props.mypage,props.inputvalue));
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
                <CModalTitle>Are you sure to delete this Restaurant Feature? </CModalTitle>
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

export default DeleteFeaturesComponent;