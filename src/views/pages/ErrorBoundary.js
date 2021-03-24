import React, { Component } from "react";

import ErrorFallbackImage from "../../assets/images/something_went_wrong.png";
import { SUPERADMIN_URL} from '../../shared/constant';
import {CButton,CCol,} from '@coreui/react'

class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI.
    return { error: error };
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    console.log(error, info);
  }
 

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      const handleTryAgain=()=>{
        window.open(
          `${SUPERADMIN_URL}`,
          '_self', // <- This is what makes it open in a new window.
          'replace=true'
        );
      }
      return (
        <React.Fragment>
          <section className="d-flex flex-column justify-content-center align-items-center">
            <img src={ErrorFallbackImage} className="error_boundary_img " style={{height:"80vh"}} alt="Error-Image" />
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton onClick={()=>handleTryAgain()} color="primary" style={{width:200}}>Try Again</CButton>
            </CCol>
            {/* <button  className="pinkbg-btn" style={{width:200,color:"#ffffff"}}>Try Again</button> */}
          </section>
        </React.Fragment>
      )
     
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
