import React from "react";
import './CustomLoadingComp.scss';
// import logo_loader from "../../assets/images/logo-white.svg"

const CustomLoadingComp=(props)=>{
    return(
        <>
        <section className="customLoadingComp-container ">
            <div className=" d-flex flex-column h-100 loader-mainwrapper d-block align-items-center justify-content-center">
                    <div className="loader">
                        <div className="loader-logo ml-auto mr-auto">
                            {props.path?
                            <img src={`${props.path}images/logo-white.svg`} className="img-fluid" />
                            :
                            <img src={`images/logo-white.svg`} className="img-fluid" />
                            }
                        </div>
                        <div class="text-center mt-3">
                            <p class="text-white">Fuss Free Food</p>
                        </div>
                        <div class="loading d-flex">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>  
                    </div>
                </div>
        </section>
        </>
    )
}

export default CustomLoadingComp;